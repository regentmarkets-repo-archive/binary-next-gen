import { fromJS } from 'immutable';
import { expect } from 'chai';
import settingsSelectors from '../settingsSelectors';

describe('settingsSelectors', () => {
    const emptyState = () => ({
        settings: fromJS({}),
        account: fromJS({}),
        appConfig: fromJS({}),
    });

    it('should be able to be created', () => {
        const state = emptyState();
        const selectors = settingsSelectors(state);
        expect(selectors).to.be.ok;
    });

    it('should return same immutable value for the same input state', () => {
        const state = emptyState();
        const first = settingsSelectors(state);
        const second = settingsSelectors(state);

        expect(first.settings).to.equal(second.settings);
        expect(first.loginid).to.equal(second.loginid);
        expect(first.appConfig).to.equal(second.appConfig);

        expect(first).to.equal(second);
    });
});
