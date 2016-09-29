import { createSelector } from 'reselect';
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
        })
);

export const tradingTimesPerTradeSelector = createSelector(
    [tradeParamsSelector, tradingTimesSelector],
    (params, times) =>
        params.map(p => {
            const symbol = p.get('symbol');
            return times.find(a => a.get('symbol') === symbol);
        })
);

export const pipSizesPerTradeSelector = createSelector(
    [tradeParamsSelector, assetsSelector],
    (params, assets) =>
        params.map(p => {
            const symbol = p.get('symbol');
            const symbolDetails = assets.find(a => a.get('symbol') === symbol);
            return symbolDetails && pipsToDigits(symbolDetails.get('pip'));
        })
);

export const feedLicensesPerTradeSelector = createSelector(
    [feedLicensesSelector, tradeParamsSelector],
    (licenses, params) =>
        params.map(p => {
            const symbol = p.get('symbol');
            return licenses.get(symbol);
        })
);

export const tradeParamsWithSymbolNameSelector = createSelector(
    [tradeParamsSelector, assetsSelector],
    (params, assets) =>
        params.map(p => {
            const symbol = p.get('symbol');
            const symbolDetails = assets.find(a => a.get('symbol') === symbol);
            const symbolName = symbolDetails && symbolDetails.get('display_name');
            return p.set('symbolName', symbolName);
        })
);
