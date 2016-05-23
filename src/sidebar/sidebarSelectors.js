import { createSelector } from 'reselect';
import { accountSelector, bootSelector } from '../_store/directSelectors';

export default createSelector(
    [accountSelector, bootSelector],
    (currentAccount, boot) => ({
        loginid: currentAccount.get('loginid'),
        email: currentAccount.get('email'),
        accounts: boot.get('accounts'),
    })
);
