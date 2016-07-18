import {
    assetsSelector,
    currencySelector,
    tradeProposalSelector,
    tradePurchaseInfoSelector,
    tradesErrorSelector,
    tradesUIStatesSelector,
} from '../_store/directSelectors';
import { createSelector } from 'reselect';
import extractBarrier from 'binary-utils/lib/extractBarrier';
import extractDuration from 'binary-utils/lib/extractDuration';
import extractForwardStartingDuration from 'binary-utils/lib/extractForwardStartingDuration';
import extractSpreadInfo from 'binary-utils/lib/extractSpreadInfo';
import normalizedContractFor from 'binary-utils/lib/normalizedContractFor';
import groupByKey from 'binary-utils/lib/groupByKey';
import findDeep from 'binary-utils/lib/findDeep';
import filterObjectBy from 'binary-utils/lib/filterObjectBy';
import { paramPerTrade, pipSizePerTrade } from '../trade/trade-chart/TradeViewChartSelector';
import { mockedContract } from '../_constants/MockContract';

const aggregateContracts = (contracts, type) => ({
    barriers: extractBarrier(contracts, type),
    durations: extractDuration(contracts, type),
    forwardStartingDuration: extractForwardStartingDuration(contracts, type),
    spread: (type.indexOf('SPREAD') > -1) ? extractSpreadInfo(contracts) : null,
});

const contractsPerSymbol = createSelector(
    contracts => contracts,
    contracts => {
        const normalized = normalizedContractFor(contracts);
        Object.keys(normalized).forEach(category => {
            const categoryObj = normalized[category];
            Object.keys(categoryObj).forEach(type => {
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
        tradingOptions
            .map((contract, symbol) => {
                if (contract.error) {
                    return contract;            // do not process error
                }

                // each immediate child refer to a type, eg Rise/Fall
                const contractTree = contractsPerSymbol(contract);

                // remove trade type without start later if market is closed
                return assetsIsOpen[symbol] && assetsIsOpen[symbol].isOpen ?
                    contractTree :
                    filterObjectBy(contractTree, obj =>
                        findDeep(obj, descendent => descendent && !!descendent.forwardStartingDuration)
                    );
            })
);


const contractPerTrade = createSelector(
    [availableContractsSelector, paramPerTrade],
    (contracts, param) => {
        const symbol = param.get('symbol');
        return contracts.get(symbol);
    }
);

const marketIsOpenPerTrade = createSelector(
    [assetsIsOpenSelector, paramPerTrade],
    (assetsIsOpen, param) => {
        const symbol = param.get('symbol');
        return assetsIsOpen[symbol] && assetsIsOpen[symbol].isOpen;
    }
);

const errorPerTrade = (state, props) => tradesErrorSelector(state).get(props.index);
const proposalPerTrade = (state, props) => tradeProposalSelector(state).get(props.index);
const uiStatePerTrade = (state, props) => tradesUIStatesSelector(state).get(props.index);
const purchasePerTrade = (state, props) => tradePurchaseInfoSelector(state).get(props.index);

const getStartLaterOnlyContract = contract => {
    const startLaterCategories =
        filterObjectBy(contract, child =>
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

        const disabled = !contract || contractToUse.error || uiState.get('disabled');
        return {
            currency,
            contract: contractToUse,
            disabled,
            errors,
            index,
            pipSize,
            proposal: proposalInfo.get('proposal'),
            tradeParams: params,
        };
    }
);
