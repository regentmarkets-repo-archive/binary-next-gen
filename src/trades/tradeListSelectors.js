import { createStructuredSelector } from 'reselect';
import {
    currencySelector,
    ticksSelector,
    activeTradeIndexSelector,
    feedLicensesSelector,
} from '../_store/directSelectors';
import {
    tradesWithDetailsSelector,
    availableAssetsSelector,
    availableContractsSelector,
} from '../fulltrade/FullTradeSelectors';

export default createStructuredSelector({
    assetsGrouped: availableAssetsSelector,
    contracts: availableContractsSelector,
    currency: currencySelector,
    feedLicensesBySymbol: feedLicensesSelector,
    trades: tradesWithDetailsSelector,
    ticksForAllSymbols: ticksSelector, // not really!!!
    activeTradeIndex: activeTradeIndexSelector,
});
