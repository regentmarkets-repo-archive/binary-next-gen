import { createStructuredSelector } from 'reselect';
import { accountSelector } from '../_store/directSelectors';

export default createStructuredSelector({
  account: accountSelector,
});
