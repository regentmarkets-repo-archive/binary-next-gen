import { fromJS } from 'immutable';
import getConstraints from '../SettingsSelfExclusion';

describe('settingsSelfExclusionValidation', () => {
  const state = emptyState = () => ({
    settings: fromJS({}),
    account: fromJS({}),
    boot: fromJS({}),
  });

  it('should be able to execute', () => {
    const state = emptyState();

    const actual = assetIndexSelectors(state);

    expect(actual).toBeDefined();
  });

  it('should return same immutable value for the same input state', () => {
    const state = emptyState();
    const first = settingsSelectors(state);
    const second = settingsSelectors(state);

    expect(first.settings).toEqual(second.settings);
    expect(first.loginid).toEqual(second.loginid);
    expect(first.boot).toEqual(second.boot);

    expect(first).toEqual(second);
  });
});
