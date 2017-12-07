import { fromJS } from 'immutable';
import setCurrencySelectors from '../setCurrencySelectors';

describe('setCurrencySelectors', () => {
  const emptyState = () => ({
    account: fromJS({}),
  });

  it('should be able to be created', () => {
    const state = emptyState();
    const selectors = setCurrencySelectors(state);
    expect(selectors).toBeDefined();
  });

  it('should return same immutable value for the same input state', () => {
    const state = emptyState();
    const first = setCurrencySelectors(state);
    const second = setCurrencySelectors(state);

    expect(first.account).toEqual(second.account);

    expect(first).toEqual(second);
  });
});
