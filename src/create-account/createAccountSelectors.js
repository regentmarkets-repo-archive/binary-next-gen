import { createStructuredSelector } from 'reselect';
import { createAccountSelector } from '../_store/directSelectors';

export default createStructuredSelector({
    createAccount: createAccountSelector,
});
