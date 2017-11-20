import { createStructuredSelector } from 'reselect';
import { accountSelector, accountsSelector, loginidSelector } from '../_store/directSelectors';

export default createStructuredSelector({
  accounts: accountsSelector,
  loginid: loginidSelector,
  account: accountSelector,
});
