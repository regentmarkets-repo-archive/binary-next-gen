import { fromJS } from 'immutable';
import { createSelector, createStructuredSelector } from 'reselect';
import { currencySelector, ticksSelector } from '../_store/directSelectors';
import {
    tradesParamsSelector,
    tradesPipSizeSelector,
    tradesTradingTimesSelector,
    availableContractsSelector,
    assetsIsOpenSelector,
} from '../trade/TradeSelectors';

const firstTradeSymbol = createSelector(
    state => tradesParamsSelector(state).first(),
    firstTradeParam => firstTradeParam.get('symbol')
);

const marketIsOpen = createSelector(
    [assetsIsOpenSelector, firstTradeSymbol],
    (assets, symbol) => {
        const firstTradeAsset = assets[symbol];
        return firstTradeAsset && firstTradeAsset.isOpen;
    }
);

export const ticksForFirstTradeSelector = createSelector(
    [firstTradeSymbol, ticksSelector],
    (symbol, ticks) => ticks.get(symbol) || fromJS([])
);

export const singleContract = createSelector(
  [availableContractsSelector, firstTradeSymbol],
  (contracts, symbol) => contracts.get(symbol)
);

export const mobileTradeTypePickerSelector = createStructuredSelector({
    contract: singleContract,
    params: state => tradesParamsSelector(state).first(),
});

export default createStructuredSelector({
    contract: singleContract,
    currency: currencySelector,
    marketIsOpen,
    params: state => tradesParamsSelector(state).first(),
    pipSize: state => tradesPipSizeSelector(state).first(),
    proposalInfo: state => state.tradesProposalInfo.first(),
    purchaseInfo: state => state.tradesPurchaseInfo.first(),
    uiState: state => state.tradesUIStates.first(),
    tradingTime: state => tradesTradingTimesSelector(state).first(),
    tradeErrors: state => state.tradesError.first(),
    ticks: ticksForFirstTradeSelector,
});
