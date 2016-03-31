import { fromJS } from 'immutable';
import { expect } from 'chai';
import { CREATE_ACCOUNT_ERROR, CREATE_ACCOUNT_FIELD_UPDATE, CREATE_ACCOUNT_START } from '../../_constants/ActionTypes';
import createAccountReducer from '../CreateAccountReducer';

describe('createAccountReducer', () => {
    it('should be able to CREATE_ACCOUNT_START', () => {
        const beforeState = fromJS({
            progress: false,
        });
        const expectedState = fromJS({
            progress: true,
        });
        const action = {
            type: CREATE_ACCOUNT_START,
        };
        const actualState = createAccountReducer(beforeState, action);
        expect(expectedState).to.equal(actualState);
    });

    it('should be able to update account field', () => {
        const beforeState = fromJS({});
        const expectedState = fromJS({
            email: 'example@binary.com',
        });
        const action = {
            type: CREATE_ACCOUNT_FIELD_UPDATE,
            fieldName: 'email',
            fieldValue: 'example@binary.com',
        };
        const actualState = createAccountReducer(beforeState, action);
        expect(expectedState).to.equal(actualState);
    });

    it('should handle create account error', () => {
        const stateBefore = fromJS({});
        const expectedState = fromJS({
            error: 'Create account failed.',
        });
        const action = {
            type: CREATE_ACCOUNT_ERROR,
            error: 'Create account failed.',
        };
        const actualState = createAccountReducer(stateBefore, action);
        expect(expectedState).to.equal(actualState);
    });

    it('should return the same create account state when no type is provided', () => {
        const beforeState = fromJS({
            type: '',
            error: 'Create account failed.',
        });
        const action = {
            type: '',
            error: 'Create account failed.',
        };
        const actualState = createAccountReducer(beforeState, action);
        expect(actualState).to.equal(beforeState);
    });
});
