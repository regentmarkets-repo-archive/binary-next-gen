import { fromJS } from 'immutable';
import appConfigReducer from '../AppConfigReducer';
import { UPDATE_APP_CONFIG } from '../../_constants/ActionTypes';
import { expect } from 'chai';

describe('appConfigReducer', () => {
    it('should update appconfig state with the given field and value', () => {
        const action = {
            type: UPDATE_APP_CONFIG,
            field: 'language',
            value: 'FR',
        };
        const expectedState = fromJS({
            language: 'FR',
        });
        const actualState = appConfigReducer(fromJS({}), action);
        expect(expectedState).to.equal(actualState);
    });

    it('should return the same appConfig state when wrong state type is given', () => {
        const beforeState = fromJS({
            language: 'EN',
        });
        const action = {
            type: 'NON_EXISTING_TYPE',
            field: 'language',
            value: 'light',
        };
        const actualState = appConfigReducer(beforeState, action);
        expect(actualState).to.equal(beforeState);
    });
});
