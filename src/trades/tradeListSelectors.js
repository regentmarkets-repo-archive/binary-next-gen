import { createStructuredSelector } from 'reselect';
import {
    currencySelector,
    ticksSelector,
    tradesCountSelector,
    layoutNSelector,
} from '../_store/directSelectors';
import {
    availableContractsSelector,
    assetsIsOpenSelector,
    tradesParamsSelector,
    tradesPipSizeSelector,
    tradesTradingTimesSelector,
    tradesErrorsSelector,
} from '../trade/TradeSelectors';

export default createStructuredSelector({
    assetsIsOpen: assetsIsOpenSelector,
    contracts: availableContractsSelector,
    currency: currencySelector,
    layoutN: layoutNSelector,
    paramsList: tradesParamsSelector,
    pipSizeList: tradesPipSizeSelector,
    proposalInfoList: state => state.tradesProposalInfo,
    purchaseInfoList: state => state.tradesPurchaseInfo,
    tradesCount: tradesCountSelector,
    ticksForAllSymbols: ticksSelector, // not really!!!
    tradingTimeList: tradesTradingTimesSelector,
    uiStateList: state => state.tradesUIStates,
    tradeErrorList: tradesErrorsSelector,
});
