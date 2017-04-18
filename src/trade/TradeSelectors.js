import { createSelector } from 'reselect';
import { contractReceiptsPerTradeSelector } from './BasicTradeSelectors';
import { tradeViewChartSelector } from './trade-chart/TradeViewChartSelector';
import TradeParams from '../trade-params/TradeParamsSelector';

export default createSelector(
    [tradeViewChartSelector, TradeParams, contractReceiptsPerTradeSelector],
    (charts, params, receipts) =>
        params.map((p, i) => ({
            contractReceiptProps: receipts.get(i),
            chartProps: charts.get(i),
            paramsProps: p,
        })),
);
