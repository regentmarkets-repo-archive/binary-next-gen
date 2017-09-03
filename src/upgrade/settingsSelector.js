import { createStructuredSelector } from 'reselect';
import { settingsSelector, loginidSelector } from '../_store/directSelectors';

export default createStructuredSelector({
  settings: settingsSelector,
  loginid: loginidSelector,
});
