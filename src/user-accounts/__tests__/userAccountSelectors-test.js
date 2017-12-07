import { fromJS } from 'immutable';
import userAccountsSelectors from '../userAccountsSelectors';

describe('userAccountsSelectors', () => {
  const emptyState = () => ({
    account: fromJS({}),
    loginid: fromJS({}),
    accounts: fromJS({}),
    upgradeInfo: fromJS({}),
    boot: fromJS({}),
  });

  it('should be able to be created', () => {
    const state = emptyState();
    const selectors = userAccountsSelectors(state);
    expect(selectors).toBeDefined();
  });

  it('should return same immutable value for the same input state', () => {
    const state = emptyState();
    const first = userAccountsSelectors(state);
    const second = userAccountsSelectors(state);

    expect(first.account).toEqual(second.account);
    expect(first.loginid).toEqual(second.loginid);
    expect(first.accounts).toEqual(second.accounts);
    expect(first.upgradeInfo).toEqual(second.upgradeInfo);

    expect(first).toEqual(second);
  });
});
