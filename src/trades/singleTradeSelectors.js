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

const singleContract = createSelector(
  [availableContractsSelector, firstTradeSelector],
  (contracts, trade) => contracts.get(trade.get('symbol'))
);

export default createStructuredSelector({
    contract: singleContract,
    currency: currencySelector,
    trade: firstTradeSelector,
    ticks: ticksForFirstTradeSelector,
});
