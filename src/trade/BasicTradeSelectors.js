import { createSelector } from 'reselect';
import { createListSelector } from 'reselect-map';
import { pipsToDigits } from 'binary-utils';
import {
    assetsSelector,
    boughtContractsSelector,
    feedLicensesSelector,
    tradePurchaseInfoSelector,
    tradeParamsSelector,
    tradingTimesSelector,
} from '../_store/directSelectors';

export const contractReceiptsPerTradeSelector = createSelector(
    [tradePurchaseInfoSelector, boughtContractsSelector],
    (purchaseInfos, contracts) =>
        purchaseInfos.map(p => {
            const contractID = p.get('mostRecentContractId');
            if (!contractID) return undefined;
            return contracts.get(contractID);
        }),
);

export const symbolOnlySelector = createSelector(tradeParamsSelector, params =>
    params.map(p => p.get('symbol')),
);

export const tradingTimesPerTradeSelector = createSelector(
    [symbolOnlySelector, tradingTimesSelector],
    (symbols, times) =>
        symbols.map(symbol => times.find(a => a.get('symbol') === symbol)),
);

export const pipSizesPerTradeSelector = createSelector(
    [symbolOnlySelector, assetsSelector],
    (symbols, assets) =>
        symbols.map(symbol => {
            const symbolDetails = assets.find(a => a.get('symbol') === symbol);
            return symbolDetails && pipsToDigits(symbolDetails.get('pip'));
        }),
);

export const feedLicensesPerTradeSelector = createSelector(
    [feedLicensesSelector, symbolOnlySelector],
    (licenses, symbols) => symbols.map(symbol => licenses.get(symbol)),
);

export const tradeParamsWithSymbolNameSelector = createListSelector(
    [tradeParamsSelector, assetsSelector],
    (p, assets) => {
        const symbol = p.get('symbol');
        const symbolDetails = assets.find(a => a.get('symbol') === symbol);
        const symbolName = symbolDetails && symbolDetails.get('display_name');
        return p.set('symbolName', symbolName);
    },
);
