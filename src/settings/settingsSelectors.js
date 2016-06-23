import { createStructuredSelector } from 'reselect';
import { bootSelector, settingsSelector, statesSelector, loginidSelector, balanceSelector } from '../_store/directSelectors';

export default createStructuredSelector({
	settings: settingsSelector,
	states: statesSelector,
	loginid: loginidSelector,
	balance: balanceSelector,
	boot: bootSelector,
});
