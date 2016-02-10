import { createStructuredSelector } from 'reselect';

const accountSelector = state => state.account;

export default createStructuredSelector({
    account: accountSelector,
});
