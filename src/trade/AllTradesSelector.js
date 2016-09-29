import { createStructuredSelector } from 'reselect';
import { tradesCountSelector, layoutNSelector } from '../_store/directSelectors';
import TradesSelector from './TradeSelectors';

export default createStructuredSelector({
    tradesCount: tradesCountSelector,
    layoutN: layoutNSelector,
    trades: TradesSelector,
});
