import { createStructuredSelector } from 'reselect';
import {
    currencySelector,
    ticksSelector,
    activeTradeIndexSelector,
    tradesCountSelector,
    layoutNSelector,
} from '../_store/directSelectors';
import {
    tradesWithDetailsSelector,
    availableContractsSelector,
    assetsIsOpenSelector,
} from '../fulltrade/FullTradeSelectors';

export default createStructuredSelector({
    tradesCount: tradesCountSelector,
    layoutN: layoutNSelector,
    assetsIsOpen: assetsIsOpenSelector,
    contracts: availableContractsSelector,
    currency: currencySelector,
    trades: tradesWithDetailsSelector,
    ticksForAllSymbols: ticksSelector, // not really!!!
    activeTradeIndex: activeTradeIndexSelector,
});
