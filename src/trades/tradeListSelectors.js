import { createSelector, createStructuredSelector } from 'reselect';
import { currencySelector, ticksSelector, accountSelector } from '../_store/directSelectors';
import {
    tradesWithDetailsSelector,
    availableAssetsSelector,
    availableContractsSelector,
} from '../fulltrade/FullTradeSelectors';

// contract: contracts.get(trade.get('symbol')),
// tick: ticks.get(trade.get('symbol')),

export default createStructuredSelector({
    assetsGrouped: availableAssetsSelector,
    contracts: availableContractsSelector,
    currency: currencySelector,
    trades: tradesWithDetailsSelector,
    ticks: ticksSelector, // not really!!!
    isAuthorized: state => (state.appState.get('authorized')),
});
