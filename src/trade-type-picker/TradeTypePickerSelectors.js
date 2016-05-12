import { createStructuredSelector } from 'reselect';
import { firstTradeSelector, singleContract } from '../trades/singleTradeSelectors';

export const mobileTradeTypePickerSelector = createStructuredSelector({
    contract: singleContract,
    trade: firstTradeSelector,
});
