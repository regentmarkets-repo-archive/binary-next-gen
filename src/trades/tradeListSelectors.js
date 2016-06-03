import { createStructuredSelector } from 'reselect';
import {
    currencySelector,
    ticksSelector,
    tradesCountSelector,
    layoutNSelector,
    feedLicensesSelector,
    ohlcSelector,
} from '../_store/directSelectors';
import {
    availableContractsSelector,
    assetsIsOpenSelector,
    tradesParamsSelector,
    tradesPipSizeSelector,
    tradesTradingTimesSelector,
    tradesPurchaseInfoSelector,
} from '../trade/TradeSelectors';

export default createStructuredSelector({
    assetsIsOpen: assetsIsOpenSelector,
    contracts: availableContractsSelector,
    currency: currencySelector,
    layoutN: layoutNSelector,
    licensesForAllSymbol: feedLicensesSelector,
    paramsList: tradesParamsSelector,
    pipSizeList: tradesPipSizeSelector,
    proposalInfoList: state => state.tradesProposalInfo,
    purchaseInfoList: tradesPurchaseInfoSelector,
    tradesCount: tradesCountSelector,
    ticksForAllSymbols: ticksSelector, // not really!!!
    ohlcForAllSymbols: ohlcSelector,
    tradingTimeList: tradesTradingTimesSelector,
    uiStateList: state => state.tradesUIStates,
    tradeErrorList: state => state.tradesError,
});
