import { createStructuredSelector } from 'reselect';
import { createAccountSelector } from '../_store/baseSelectors';

export default createStructuredSelector({
    createAccount: createAccountSelector,
});
