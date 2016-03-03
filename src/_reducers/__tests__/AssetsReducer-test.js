import { expect } from 'chai';
import { fromJS } from 'immutable';
import * as actions from '../../_actions/AssetsActions';
import assetsReducer from '../AssetsReducer';

describe('assetsReducer', () => {
    it('by default the state is empty', () => {
        const noAction = { type: '' };
        const initialState = assetsReducer(undefined, noAction);
        const expected = fromJS([]);
        expect(expected).to.equal(initialState);
    });

    describe('serverDataActiveSymbols', () => {
        it('should be empty on empty server response', () => {
            const action = actions.serverDataActiveSymbols({ active_symbols: [] });
            const stateAfter = assetsReducer(undefined, action);
            const expected = fromJS([]);
            expect(expected).to.equal(stateAfter);
        });
    });
});
