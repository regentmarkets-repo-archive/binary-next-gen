import { fromJS } from 'immutable';
import expect from 'expect';
import signinSelectors from '../SigninSelectors';

describe('signinSelectors', () => {

    const emptyState = () => ({
        signin: fromJS({}),
        account: fromJS({}),
    });

    it('should be able to be retrieved', () => {
        const state = emptyState();
        const selectors = signinSelectors(state);

        expect(selectors).toExist();
    });

    it('should return immutable result', () => {
        const state = emptyState();
        const first = signinSelectors(state);
        const second = signinSelectors(state);

        expect(first).toBe(second);
    });
});
