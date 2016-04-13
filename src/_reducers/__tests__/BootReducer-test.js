import { fromJS } from 'immutable';
import bootReducer from '../BootReducer';
import { UPDATE_BOOT } from '../../_constants/ActionTypes';
import { expect } from 'chai';

describe('bootReducer', () => {
    it('should update boot state with the given field and value', () => {
        const action = {
            type: UPDATE_BOOT,
            field: 'language',
            value: 'FR',
        };
        const expectedState = fromJS({
            language: 'FR',
        });
        const actualState = bootReducer(fromJS({}), action);
        expect(expectedState).to.equal(actualState);
    });

    it('should return the same boot state when wrong state type is given', () => {
        const beforeState = fromJS({
            language: 'EN',
        });
        const action = {
            type: 'NON_EXISTING_TYPE',
            field: 'language',
            value: 'light',
        };
        const actualState = bootReducer(beforeState, action);
        expect(actualState).to.equal(beforeState);
    });
});
