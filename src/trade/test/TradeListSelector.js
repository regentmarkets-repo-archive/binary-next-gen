import { tradesCountSelector } from '../../_store/directSelectors';
import { singleTradeSelector } from './TradeParamsSelector';
import { createSelector, createStructuredSelector } from 'reselect';

const tradeListSelector = count => {
    const arr = new Array(count);
    return createSelector(
        arr.map((v, i) => singleTradeSelector(i)),
        (...trades) => {
            console.log(trades);
            return trades;
        }
    );
}

export const allTradesSelector = createSelector(
    [tradesCountSelector, state => state],
    (count, state) => {
        return tradeListSelector(count)(state);
    }
);
