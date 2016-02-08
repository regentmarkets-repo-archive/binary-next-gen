import { createStructuredSelector } from 'reselect';

const currencySelector = state => state.account.get('currency');
const balanceSelector = state => +state.account.get('balance');

export default createStructuredSelector({
	currency: currencySelector,
	balance: balanceSelector,
});
