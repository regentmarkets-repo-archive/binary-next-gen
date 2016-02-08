import { fromJS } from 'immutable';
import expect from 'expect';
import balanceSelectors from '../BalanceSelectors';

describe('balanceSelectors', () => {
    const emptyState = () => ({ account: fromJS({}) });

	it('should be able to be created', () => {
        const state = emptyState();
		const selector = balanceSelectors(state);
		expect(selector).toExist();
	});
});
