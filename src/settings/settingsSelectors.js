import { createStructuredSelector } from 'reselect';
import { appConfigSelector, settingsSelector } from '../_store/directSelectors';

const loginidSelector = state => state.account.get('loginid');
const balanceSelector = state => state.account.get('balance');

export default createStructuredSelector({
	settings: settingsSelector,
	loginid: loginidSelector,
	balance: balanceSelector,
	appConfig: appConfigSelector,
});
