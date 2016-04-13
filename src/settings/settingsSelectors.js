import { createStructuredSelector } from 'reselect';
import { bootSelector, settingsSelector, loginidSelector, balanceSelector } from '../_store/directSelectors';

export default createStructuredSelector({
	settings: settingsSelector,
	loginid: loginidSelector,
	balance: balanceSelector,
	boot: bootSelector,
});
