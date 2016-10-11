import { fromJS } from 'immutable';
import settingsSelectors from '../settingsSelectors';

describe('settingsSelectors', () => {
    const emptyState = () => ({
        settings: fromJS({}),
        account: fromJS({}),
        boot: fromJS({}),
    });

    it('should be able to be created', () => {
        const state = emptyState();
        const selectors = settingsSelectors(state);
        expect(selectors).toBeDefined();
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
