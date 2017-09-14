import { createStructuredSelector } from 'reselect';
import { fractionalDigitsSelector } from '../_store/directSelectors';

const currencySelector = state => state.account.get('currency');
const balanceSelector = state => +state.account.get('balance');

export default createStructuredSelector({
  currency: currencySelector,
  balance: balanceSelector,
  digits: fractionalDigitsSelector
});
