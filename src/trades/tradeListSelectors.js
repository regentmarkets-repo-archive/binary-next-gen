import { createStructuredSelector } from 'reselect';
import { currencySelector, ticksSelector, activeTradeIndexSelector } from '../_store/directSelectors';
import {
    tradesWithDetailsSelector,
    availableAssetsSelector,
    availableContractsSelector,
} from '../fulltrade/FullTradeSelectors';

export default createStructuredSelector({
    assetsGrouped: availableAssetsSelector,
    contracts: availableContractsSelector,
    currency: currencySelector,
    trades: tradesWithDetailsSelector,
    ticksForAllSymbols: ticksSelector, // not really!!!
    activeTradeIndex: activeTradeIndexSelector,
});
