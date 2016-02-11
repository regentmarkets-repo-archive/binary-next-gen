import { createSelector } from 'reselect';

const accountSelector = state => state.account;

export default createSelector(
    [accountSelector],
    account => ({
        loginid: account.get('loginid'),
        email: account.get('email'),
    })
);
