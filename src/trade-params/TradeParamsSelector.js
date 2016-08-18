import { createSelector } from 'reselect';
import { extractBarrier, extractDuration, extractForwardStartingDuration,
    extractSpreadInfo, normalizedContractFor, groupByKey,
    findDeep, filterDeep } from 'binary-utils';
import { assetsSelector, currencySelector } from '../_store/directSelectors';
import { pipSizePerTrade } from '../trade/trade-chart/TradeViewChartSelector';
import { mockedContract } from '../_constants/MockContract';
import { paramPerTrade, errorPerTrade, proposalPerTrade, purchasePerTrade, uiStatePerTrade } from '../trade/TradeSelectors';

const aggregateContracts = (contracts, type) => ({
    barriers: extractBarrier(contracts, type),
    durations: extractDuration(contracts, type),
    forwardStartingDuration: extractForwardStartingDuration(contracts, type),
    spread: (type.indexOf('SPREAD') > -1) ? extractSpreadInfo(contracts) : null,
});

export const contractsPerSymbol = createSelector(
    contracts => contracts,
    contracts => {
        if (contracts.error) return contracts;      // do not process error
        const normalized = normalizedContractFor(contracts);
        Object.keys(normalized).forEach(category => {
            const categoryObj = normalized[category];
            Object.keys(categoryObj).forEach(type => {
                if (!type) return;
                const contractsPerType = aggregateContracts(categoryObj[type], type);
                categoryObj[type] = contractsPerType;
            });
            normalized[category] = categoryObj;
        });
        return normalized;
    }
);

export const assetsIsOpenSelector = createSelector(
    assetsSelector,
    assets => {
        const assetsIsOpen = assets.map(a => ({ symbol: a.get('symbol'), isOpen: !!a.get('exchange_is_open') }));
        const assetsIsOpenObject = groupByKey(assetsIsOpen.toJS(), 'symbol');
        Object.keys(assetsIsOpenObject).forEach(symbol => {
            if (assetsIsOpenObject[symbol]) {
                assetsIsOpenObject[symbol] = assetsIsOpenObject[symbol][0];
            }
        });
        return assetsIsOpenObject;
    }
);

export const availableContractsSelector = createSelector(
    [state => state.tradingOptions, assetsIsOpenSelector],
    (tradingOptions, assetsIsOpen) =>
        tradingOptions.map((contract, symbol) => {
            // each immediate child refer to a type, eg Rise/Fall
            const contractTree = contractsPerSymbol(contract);

            // remove trade type without start later if market is closed
            return assetsIsOpen[symbol] && assetsIsOpen[symbol].isOpen ?
                contractTree :
                filterDeep(contractTree, obj =>
                    findDeep(obj, descendent => descendent && !!descendent.forwardStartingDuration)
                );
        })
);

const contractPerTrade = createSelector(
    [availableContractsSelector, paramPerTrade],
    (contracts, param) => {
        if (!param) return undefined;
        const symbol = param.get('symbol');
        return contracts.get(symbol);
    }
);

const marketIsOpenPerTrade = createSelector(
    [assetsIsOpenSelector, paramPerTrade],
    (assetsIsOpen, param) => {
        if (!param) return undefined;
        const symbol = param.get('symbol');
        return assetsIsOpen[symbol] && assetsIsOpen[symbol].isOpen;
    }
);

const getStartLaterOnlyContract = contract => {
    const startLaterCategories =
        filterDeep(contract, child =>
            findDeep(child, descendent => descendent && !!descendent.forwardStartingDuration));

    // side effect to remove durations property, to indicate it's only start later
    Object.keys(startLaterCategories).forEach(category => {
        Object.keys(startLaterCategories[category]).forEach(type => {
            if (startLaterCategories[category][type].durations) {
                delete startLaterCategories[category][type].durations;
            }
        });
    });

    return startLaterCategories;
};

export const tradeParamsPerTrade = createSelector(
    [
        currencySelector,
        contractPerTrade,
        paramPerTrade,
        errorPerTrade,
        pipSizePerTrade,
        purchasePerTrade,
        proposalPerTrade,
        uiStatePerTrade,
        marketIsOpenPerTrade,
        (state, props) => props.index,
    ],
    (currency, contract, params, errors, pipSize, purchaseInfo, proposalInfo, uiState, marketIsOpen, index) => {
        let contractToUse = contract;
        if (!contract) {
            contractToUse = mockedContract;
        } else if (!marketIsOpen) {
            contractToUse = getStartLaterOnlyContract(contract);
        }
        const hasError = errors.valueSeq().filter(v => !!v).size > 0;
        const disabled =
            !contract ||
            contractToUse.error ||
            uiState.get('disabled') ||
            hasError;
        return {
            currency,
            contract: contractToUse,
            disabled,
            errors,
            index,
            pipSize,
            proposal: proposalInfo.get('proposal'),
            tradeParams: params,
            forceRenderCount: uiState.get('forceRenderCount'),
        };
    }
);
