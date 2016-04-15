import { createStructuredSelector } from 'reselect';
import {
    currencySelector, ticksSelector,
    activeTradeIndexSelector, assetBtnClickedSelector,
} from '../_store/directSelectors';
import {
    tradesWithDetailsSelector,
    availableContractsSelector,
    assetsIsOpenSelector,
} from '../fulltrade/FullTradeSelectors';

export default createStructuredSelector({
    assetsIsOpen: assetsIsOpenSelector,
    contracts: availableContractsSelector,
    currency: currencySelector,
    trades: tradesWithDetailsSelector,
    ticksForAllSymbols: ticksSelector, // not really!!!
    activeTradeIndex: activeTradeIndexSelector,
    assetBtnClicked: assetBtnClickedSelector,
});
