import expect from 'expect';
import { fromJS } from 'immutable';
import * as actions from '../../_actions/AssetsActions';
import assetsReducer from '../AssetsReducer';

describe('assetsReducers', () => {
    it('by default the state is empty', () => {
        const noAction = { type: '' };
        const initialState = assetsReducer(undefined, noAction);
        const expected = fromJS([]);
        expect(expected).toEqual(initialState);
    });

    describe('serverDataActiveSymbols', () => {
        it('should be empty on empty server response', () => {
            const action = actions.serverDataActiveSymbols({ active_symbols: [] });
            const stateAfter = assetsReducer(undefined, action);
            const expected = fromJS([]);
            expect(expected).toEqual(stateAfter);
        });
    });
});
