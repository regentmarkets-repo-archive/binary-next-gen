import { createStructuredSelector } from 'reselect';
import { contractReceiptPerTrade, tradeViewChartPerTrade } from './trade-chart/TradeViewChartSelector';
import { tradeParamsPerTrade } from '../trade-params/TradeParamsSelector';

export default () => createStructuredSelector({
    contractReceiptProps: contractReceiptPerTrade,
    chartProps: tradeViewChartPerTrade,
    paramsProps: tradeParamsPerTrade,
});

