import { createSelector } from 'reselect';
import { contractReceipts, pipSizes, tradingTimes, feedLicenses, params } from '../BasicTradeSelectors';

export const tradeViewChartSelector = createSelector(
    [
        contractReceipts,
        tradingTimes,
        pipSizes,
        feedLicenses,
        params,
    ],
    (lastBoughtContracts, tradingTimes, pipSizes, licenses, params) =>
        params.map((p, i) => ({
            index: i,
            contractForChart: lastBoughtContracts[i],
            tradeForChart: p,
            feedLicense: licenses[i],
            pipSize: pipSizes[i],
            tradingTime: tradingTimes[i],
        }))
);
