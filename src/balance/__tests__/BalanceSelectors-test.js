import { fromJS } from 'immutable';
import { expect } from 'chai';
import balanceSelectors from '../balanceSelectors';

describe('balanceSelectors', () => {
    const emptyState = () => ({ account: fromJS({}) });

	it('should be able to be created', () => {
        const state = emptyState();
		const selector = balanceSelectors(state);
		expect(selector).to.be.ok;
	});
});
