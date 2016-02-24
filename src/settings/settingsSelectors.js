import { createStructuredSelector } from 'reselect';
import { appConfigSelector, settingsSelector, loginidSelector, balanceSelector } from '../_store/directSelectors';

export default createStructuredSelector({
	settings: settingsSelector,
	loginid: loginidSelector,
	balance: balanceSelector,
	appConfig: appConfigSelector,
});
