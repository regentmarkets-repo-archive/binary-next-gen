import { createSelector } from 'reselect';
import { contractReceiptsPerTradeSelector, pipSizesPerTradeSelector, tradingTimesPerTradeSelector, feedLicensesPerTradeSelector, tradeParamsWithSymbolNameSelector } from '../BasicTradeSelectors';

export const tradeViewChartSelector = createSelector(
    [
        contractReceiptsPerTradeSelector,
        tradingTimesPerTradeSelector,
        pipSizesPerTradeSelector,
        feedLicensesPerTradeSelector,
        tradeParamsWithSymbolNameSelector,
    ],
    (lastBoughtContracts, tradingTimes, pipSizes, licenses, params) =>
        params.map((p, i) => ({
            index: i,
            contractForChart: lastBoughtContracts.get(i),
            tradeForChart: p,
            feedLicense: licenses.get(i),
            pipSize: pipSizes.get(i),
            tradingTime: tradingTimes.get(i),
        }))
);
