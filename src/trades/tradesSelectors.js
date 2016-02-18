import { createSelector, createStructuredSelector } from 'reselect';
import { assetsSelector, contractsSelector, currencySelector, ticksSelector } from '../_store/directSelectors';
import { tradesSelector } from '../fulltrade/FullTradeSelectors';

export const firstTradeSelector = createSelector(
    tradesSelector,
    trades => ({ trade: trades.first() }),
);

export const tradesListSelector = createSelector(
    [tradesSelector, contractsSelector, ticksSelector],
    (trades, contracts, ticks) => trades.map(trade => ({
        trade,
        contract: contracts.get(trade.get('symbol')),
        tick: ticks.get(trade.get('symbol')),
    })),
);

export default createStructuredSelector({
    assets: assetsSelector,
    currency: currencySelector,
    trades: tradesListSelector,
});
