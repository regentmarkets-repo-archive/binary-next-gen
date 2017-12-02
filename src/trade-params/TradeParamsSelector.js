import { createSelector } from 'reselect';
import { extractBarrier, extractDuration, extractForwardStartingDuration,
    extractSpreadInfo, normalizedContractFor, groupByKey, findDeep, filterDeep } from 'binary-utils';
import {
    assetsSelector, currencySelector, defaultCurrencySelector, tradesErrorSelector, tradePurchaseInfoSelector,
    tradeProposalSelector, tradesUIStatesSelector, fractionalDigitsSelector, defaultStakeSelector,
} from '../_store/directSelectors';
import { mockedContract } from '../_constants/MockContract';
import { symbolOnlySelector, tradeParamsWithSymbolNameSelector, pipSizesPerTradeSelector } from '../trade/BasicTradeSelectors';

const extractTradingOptions = (contracts, type) => ({
    barriers: extractBarrier(contracts, type),
    durations: extractDuration(contracts, type),
    forwardStartingDuration: extractForwardStartingDuration(contracts, type),
    spread: (type.indexOf('SPREAD') > -1) ? extractSpreadInfo(contracts) : null,
});

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

export const tradingOptionsForOneSymbol = createSelector(
    contracts => contracts,
    contracts => {
        if (contracts.error) return contracts;      // do not process error
        const normalized = normalizedContractFor(contracts);
        Object.keys(normalized).forEach(category => {
            const categoryObj = normalized[category];
            Object.keys(categoryObj).forEach(type => {
                if (!type) return;
                categoryObj[type] = extractTradingOptions(categoryObj[type], type);
            });
            normalized[category] = categoryObj;
        });
        return normalized;
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

const tradingOptionsSelector = createSelector(
    [availableTradingOptionsSelector, symbolOnlySelector],
    (options, symbols) =>
        symbols.map(symbol => options.get(symbol))
);

const marketIsOpenSelector = createSelector(
    [assetsIsOpenSelector, symbolOnlySelector],
    (assetsIsOpen, symbols) =>
        symbols.map(symbol => assetsIsOpen[symbol] && assetsIsOpen[symbol].isOpen)
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

export default createSelector(
    [
        currencySelector,
        defaultCurrencySelector,
        tradingOptionsSelector,
        tradeParamsWithSymbolNameSelector,
        tradesErrorSelector,
        pipSizesPerTradeSelector,
        tradePurchaseInfoSelector,
        tradeProposalSelector,
        tradesUIStatesSelector,
        marketIsOpenSelector,
        fractionalDigitsSelector,
        defaultStakeSelector,
    ],
    (currencyOfAccount, defaultCurrency, contracts, params, errors, pipSizes, purchaseInfo, proposalInfo, uiState, marketIsOpen, fractionalDigits, defaultStake) =>
        params.map((p, i) => {
            const currency = currencyOfAccount || defaultCurrency;
            let contractToUse = contracts.get(i);
            if (!contractToUse) {
                contractToUse = mockedContract;
            } else if (!marketIsOpen.get(i)) {
                contractToUse = getStartLaterOnlyContract(contracts.get(i));
            }
            const error = errors.get(i);
            const hasError = error && error.size > 0;
            const disabled =
                !contracts.get(i) ||
                contractToUse.error ||
                uiState.getIn([i, 'disabled']) ||
                hasError;
            return {
                currency,
                contract: contractToUse,
                disabled,
                errors: error,
                index: i,
                pipSize: pipSizes.get(i),
                proposal: proposalInfo.getIn([i, 'proposal']),
                tradeParams: params.get(i),
                forceRenderCount: uiState.getIn([i, 'forceRenderCount']),
                fractionalDigits,
                defaultStake,
            };
        })
);

