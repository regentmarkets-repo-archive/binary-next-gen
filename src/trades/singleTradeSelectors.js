import { fromJS } from 'immutable';
import { createSelector, createStructuredSelector } from 'reselect';
import { currencySelector, ticksSelector } from '../_store/directSelectors';
import {
    tradesWithDetailsSelector,
    availableContractsSelector,
} from '../fulltrade/FullTradeSelectors';

export const firstTradeSelector = createSelector(
    tradesWithDetailsSelector,
    trades => trades.first()
);

export const ticksForFirstTradeSelector = createSelector(
    [firstTradeSelector, ticksSelector],
    (trade, ticks) => ticks.get(trade.get('symbol')) || fromJS([])
);

export default createStructuredSelector({
    contracts: availableContractsSelector,
    currency: currencySelector,
    isActive: () => true,
    trade: firstTradeSelector,
    ticks: ticksForFirstTradeSelector,
});
