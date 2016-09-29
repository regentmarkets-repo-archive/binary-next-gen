import { createSelector } from 'reselect';
import { extractBarrier, extractDuration, extractForwardStartingDuration,
    extractSpreadInfo, normalizedContractFor, groupByKey,
    findDeep, filterDeep } from 'binary-utils';
import {
    assetsSelector, currencySelector, tradesErrorSelector, tradePurchaseInfoSelector,
    tradeProposalSelector, tradesUIStatesSelector,
} from '../_store/directSelectors';
import { mockedContract } from '../_constants/MockContract';
import { params, pipSizes } from '../trade/BasicTradeSelectors';

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

export const availableTradingOptionsSelector = createSelector(
    [state => state.tradingOptions, assetsIsOpenSelector],
    (tradingOptions, assetsIsOpen) =>
        tradingOptions.map((contract, symbol) => {
            // each immediate child refer to a type, eg Rise/Fall
            const contractTree = tradingOptionsForOneSymbol(contract);

            // remove trade type without start later if market is closed
            return assetsIsOpen[symbol] && assetsIsOpen[symbol].isOpen ?
                contractTree :
                filterDeep(contractTree, obj =>
                    findDeep(obj, descendent => descendent && !!descendent.forwardStartingDuration)
                );
        })
);

const tradingOptions = createSelector(
    [availableTradingOptionsSelector, params],
    (options, params) =>
        params.map(p => {
            const symbol = p.get('symbol');
            return options.get(symbol);
        })
);

const marketIsOpen = createSelector(
    [assetsIsOpenSelector, params],
    (assetsIsOpen, params) =>
        params.map(p => {
            const symbol = p.get('symbol');
            return assetsIsOpen[symbol] && assetsIsOpen[symbol].isOpen;
        })
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

export const tradeParams = createSelector(
    [
        currencySelector,
        tradingOptions,
        params,
        tradesErrorSelector,
        pipSizes,
        tradePurchaseInfoSelector,
        tradeProposalSelector,
        tradesUIStatesSelector,
        marketIsOpen,
    ],
    (currency, contracts, params, errors, pipSizes, purchaseInfo, proposalInfo, uiState, marketIsOpen) => {
        params.map((p, i) => {
            let contractToUse = contracts[i];
            if (!contractToUse) {
                contractToUse = mockedContract;
            } else if (!marketIsOpen[i]) {
                contractToUse = getStartLaterOnlyContract(contracts[i]);
            }
            const hasError = errors[i] && errors[i].valueSeq().filter(v => !!v).size > 0;
            const disabled =
                !contracts[i] ||
                contractToUse.error ||
                uiState[i].get('disabled') ||
                hasError;
            return {
                currency,
                contract: contractToUse,
                disabled,
                errors: errors[i],
                index: i,
                pipSize: pipSizes[i],
                proposal: proposalInfo[i] && proposalInfo[i].get('proposal'),
                tradeParams: params[i],
                forceRenderCount: uiState[i] && uiState[i].get('forceRenderCount'),
            };
        })
    }
);

