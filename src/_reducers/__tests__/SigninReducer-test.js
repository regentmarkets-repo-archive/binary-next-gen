import { expect } from 'chai';
import { fromJS } from 'immutable';
import * as actions from '../../_actions/SigninActions';
import signinReducer from '../SigninReducer';

describe('signinReducer', () => {
    it('should set progress to true on start signing in', () => {
        const stateBefore = fromJS({
            progress: false,
        });
        const actual = signinReducer(stateBefore, actions.signinStart());
        const expected = fromJS({
            progress: true,
        });
        expect(expected).to.equal(actual);
    });

    it('should change a field value with signinFieldUpdate', () => {
        const stateBefore = fromJS({
            email: '',
        });
        const actual = signinReducer(stateBefore, actions.signinFieldUpdate('email', 'test@example.com'));
        const expected = fromJS({
            email: 'test@example.com',
        });
        expect(expected).to.equal(actual);
    });
});
