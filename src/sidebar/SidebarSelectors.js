import { createStructuredSelector } from 'reselect';

const accountSelector = state => state.account.toJS();

export default createStructuredSelector({
    account: accountSelector,
});
