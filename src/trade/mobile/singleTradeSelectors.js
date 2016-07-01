import { createSelector, createStructuredSelector } from 'reselect';
import { tradeParamsSelector } from '../../_store/directSelectors';
import { availableContractsSelector } from '../TradeParamsSelector';

const firstTradeSymbol = createSelector(
    state => tradeParamsSelector(state).first(),
    firstTradeParam => firstTradeParam.get('symbol')
);

export const singleContract = createSelector(
  [availableContractsSelector, firstTradeSymbol],
  (contracts, symbol) => contracts.get(symbol)
);

export const mobileTradeTypePickerSelector = createStructuredSelector({
    contract: singleContract,
    params: state => tradeParamsSelector(state).first(),
});
