import { createStructuredSelector } from 'reselect';
import { settingsSelector, statesSelector, loginidSelector, bootSelector, residenceListSelector } from '../_store/directSelectors';

export default createStructuredSelector({
  settings: settingsSelector,
  states: statesSelector,
  loginid: loginidSelector,
  boot: bootSelector,
  residenceList: residenceListSelector,
});
