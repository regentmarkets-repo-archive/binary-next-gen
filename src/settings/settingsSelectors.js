import { createStructuredSelector } from 'reselect';
import {
  bootSelector, settingsSelector, statesSelector, loginidSelector, balanceSelector,
  residenceListSelector
} from '../_store/directSelectors';

export default createStructuredSelector({
	settings: settingsSelector,
	states: statesSelector,
	loginid: loginidSelector,
	balance: balanceSelector,
	boot: bootSelector,
	residenceList: residenceListSelector,
});
