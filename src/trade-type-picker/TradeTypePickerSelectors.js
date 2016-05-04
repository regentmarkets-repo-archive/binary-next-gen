import { createSelector, createStructuredSelector } from 'reselect';
import { availableContractsSelector } from '../fulltrade/FullTradeSelectors';

const tradeForMobile = createSelector(
    state => state.trades,
    allTrades => allTrades.get(0)
);

const contractForMobile = createSelector(
    [availableContractsSelector, tradeForMobile],
    (allContracts, trade) => allContracts.get(trade.get('symbol'))
);

export const mobileTradeTypePickerSelector = createStructuredSelector({
    contract: contractForMobile,
    trade: tradeForMobile,
});
