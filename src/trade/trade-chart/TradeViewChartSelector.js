import { createSelector } from 'reselect';
import { contractReceiptsPerTradeSelector, pipSizesPerTradeSelector, tradingTimesPerTradeSelector, feedLicensesPerTradeSelector, tradeParamsWithSymbolNameSelector } from '../BasicTradeSelectors';
import { tradesCountSelector, layoutNSelector } from '../../_store/directSelectors';

export const tradeViewChartSelector = createSelector(
    [
        contractReceiptsPerTradeSelector,
        tradingTimesPerTradeSelector,
        pipSizesPerTradeSelector,
        feedLicensesPerTradeSelector,
        tradeParamsWithSymbolNameSelector,
        tradesCountSelector,
        layoutNSelector,
    ],
    (lastBoughtContracts, tradingTimes, pipSizes, licenses, params, tradesCount, layoutN) =>
        params.map((p, i) => ({
            index: i,
            count: tradesCount,
            layoutN,
            contractForChart: lastBoughtContracts.get(i),
            tradeForChart: p,
            feedLicense: licenses.get(i),
            pipSize: pipSizes.get(i),
            tradingTime: tradingTimes.get(i),
        }))
);
