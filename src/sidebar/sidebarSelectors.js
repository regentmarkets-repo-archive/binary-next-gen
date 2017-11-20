import { createSelector } from 'reselect';
import { accountSelector, bootSelector, upgradeInfoSelector } from '../_store/directSelectors';

export default createSelector(
    [accountSelector, bootSelector, upgradeInfoSelector],
    (currentAccount, boot, upgradeInfo) => ({
        loginid: currentAccount.get('loginid'),
        email: currentAccount.get('email'),
        accounts: boot.get('accounts'),
        multi: upgradeInfo.get('multi'),
        canUpgrade: upgradeInfo.get('canUpgrade')
    })
);
