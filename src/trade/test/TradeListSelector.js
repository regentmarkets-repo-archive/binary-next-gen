import { tradesCountSelector, tradeParamsSelector, layoutNSelector } from '../../_store/directSelectors';
import { singleTradeSelector } from './TradeParamsSelector';
import { createSelector, createStructuredSelector } from 'reselect';

const tradeListSelector = count => {
    const arr = new Array(count).fill(0);
    const selectors = arr.map((v, i) => singleTradeSelector(i));
    return createSelector(
        selectors,
        (...trades) => trades
    );
};

export const allTradesSelector = createSelector(
    [tradeParamsSelector, state => state],
    (params, state) => tradeListSelector(params.size)(state)
);

export const layoutSelector = createStructuredSelector({
    trades: allTradesSelector,
    tradesCount: tradesCountSelector,
    layoutN: layoutNSelector,
});
