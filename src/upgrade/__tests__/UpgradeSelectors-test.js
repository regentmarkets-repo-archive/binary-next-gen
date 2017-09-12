import { fromJS } from 'immutable';
import upgradeSelectors from '../upgradeSelectors';

describe('upgradeSelectors', () => {

  const emptyState = () => ({
    settings: fromJS({}),
    states: fromJS({}),
    account: fromJS({}),
    boot: fromJS({}),
    residenceList: fromJS({}),
  });

  it('should be able to be created', () => {
    const state = emptyState();
    const selectors = upgradeSelectors(state);
    expect(selectors).toBeDefined();
  });


  it('should return same immutable value for the same input state', () => {
    const state = emptyState();
    const first = upgradeSelectors(state);
    const second = upgradeSelectors(state);

    expect(first.settings).toEqual(second.settings);
    expect(first.loginid).toEqual(second.loginid);
    expect(first.boot).toEqual(second.boot);
    expect(first.account).toEqual(second.account);
    expect(first.residenceList).toEqual(second.residenceList);

    expect(first).toEqual(second);
  });

});
