import { createStructuredSelector } from 'reselect';
import { appConfigSelector, settingsSelector } from '../_store/directSelectors';

const loginidSelector = state => state.account.get('loginid');

export default createStructuredSelector({
	settings: settingsSelector,
	loginid: loginidSelector,
	appConfig: appConfigSelector,
});
