import { fromJS } from 'immutable';
import { createSelector, createStructuredSelector } from 'reselect';
import { assetsSelector, currencySelector, ticksSelector } from '../_store/directSelectors';
import {
    tradesWithDetailsSelector,
    availableAssetsSelector,
    availableContractsSelector,
} from '../fulltrade/FullTradeSelectors';

export const firstTradeSelector = createSelector(
    tradesWithDetailsSelector,
    trades => trades.first(),
);

export const ticksForFirstTradeSelector = createSelector(
    [firstTradeSelector, ticksSelector],
    (trade, ticks) => ticks.get(trade.get('symbol')) || fromJS([]),
);

export default createStructuredSelector({
    assets: assetsSelector,
    assetsGrouped: availableAssetsSelector,
    contracts: availableContractsSelector,
    currency: currencySelector,
    trade: firstTradeSelector,
    ticks: ticksForFirstTradeSelector,
});
