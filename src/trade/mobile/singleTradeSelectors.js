import { createSelector, createStructuredSelector } from 'reselect';

import {
    tradesParamsSelector,
    availableContractsSelector,
} from '../TradeSelectors';

const firstTradeSymbol = createSelector(
    state => tradesParamsSelector(state).first(),
    firstTradeParam => firstTradeParam.get('symbol')
);

export const singleContract = createSelector(
  [availableContractsSelector, firstTradeSymbol],
  (contracts, symbol) => contracts.get(symbol)
);

export const mobileTradeTypePickerSelector = createStructuredSelector({
    contract: singleContract,
    params: state => tradesParamsSelector(state).first(),
});
