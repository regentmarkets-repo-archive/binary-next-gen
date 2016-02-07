import { fromJS } from 'immutable';
import appStateReducer from '../AppStateReducer';
import { UPDATE_APP_STATE } from '../../_constants/ActionTypes';
import expect from 'expect';

describe('AppStateReducer', () => {
    it('should update appstate field with the given value', () => {
        const stateBefore = fromJS({});
        const action = {
            type: UPDATE_APP_STATE,
            field: 'authorized',
            value: true,
        };
        const stateExpectedAfter = fromJS({
            authorized: true,
        });

        const actualState = appStateReducer(stateBefore, action);

        expect(stateExpectedAfter).toEqual(actualState);
    });

    it('should return the same state when a wrong actiontype is provided', () => {
        const stateBefore = {
            someProperty: 'some value',
        };
        const action = {
            type: 'NON_EXISTING_TYPE',
        };
        const actualState = appStateReducer(stateBefore, action);
        expect(actualState).toEqual(stateBefore);
    });
});
