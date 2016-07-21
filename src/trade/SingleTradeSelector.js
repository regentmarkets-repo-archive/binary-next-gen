import { createStructuredSelector } from 'reselect';
import { tradesUIStatesSelector } from '../_store/directSelectors';
import { contractReceiptPerTrade, tradeViewChartPerTrade } from './trade-chart/TradeViewChartSelector';
import { tradeParamsPerTrade } from '../trade-params/TradeParamsSelector';

const userInputDisabledPerTrade =
    (state, props) => tradesUIStatesSelector(state).getIn([props.index, 'userInputDisabled']);

export default () => createStructuredSelector({
    contractReceiptProps: contractReceiptPerTrade,
    chartProps: tradeViewChartPerTrade,
    paramsProps: tradeParamsPerTrade,
    userInputDisabled: userInputDisabledPerTrade,
});

