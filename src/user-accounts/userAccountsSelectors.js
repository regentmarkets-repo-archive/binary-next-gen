import { createStructuredSelector } from 'reselect';
import { accountSelector, loginidSelector, upgradeInfoSelector, settingsSelector, accountsSelector } from '../_store/directSelectors';

export default createStructuredSelector({
  loginid: loginidSelector,
  upgradeInfo: upgradeInfoSelector,
  account: accountSelector,
  accounts: accountsSelector,
  settings: settingsSelector,
});
