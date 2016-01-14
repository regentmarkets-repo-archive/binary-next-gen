import expect from 'expect';
import { fromJS } from 'immutable';
import * as actions from '../../_actions/SigninActions';
import SigninReducer from '../SigninReducer';

describe('SigninReducer', () => {
    it('should set progress to true on start signing in', () => {
        const stateBefore = fromJS({
            progress: false,
        });
        const actual = SigninReducer(stateBefore, actions.signinStart());
        const expected = fromJS({
            progress: true,
        });
        expect(actual).toEqual(expected);
    });

    it('should change a field value with signinFieldUpdate', () => {
        const stateBefore = fromJS({
            email: '',
        });
        const actual = SigninReducer(stateBefore, actions.signinFieldUpdate('email', 'test@example.com'));
        const expected = fromJS({
            email: 'test@example.com',
        });
        expect(actual).toEqual(expected);
    });
});
