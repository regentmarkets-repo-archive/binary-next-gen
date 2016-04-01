import chai, { expect } from 'chai';
import chaiImmutable from 'chai-immutable';
chai.use(chaiImmutable);

import { fromJS } from 'immutable';
import newsReducer from '../NewsReducer';
import {
    UPDATE_NEWS_LIST,
} from '../../_constants/ActionTypes';

describe('newsReducer', () => {
    it('should update news list with the new list', () => {
        const stateBefore = fromJS([]);
        const action = {
            type: UPDATE_NEWS_LIST,
            articles: [{ title: 'some title', description: 'some description' }],
        };
        const expectedState = fromJS([{ title: 'some title', description: 'some description' }]);
        const actualState = newsReducer(stateBefore, action);

        expect(expectedState).to.deep.equal(actualState);
    });

    it('should return the same state when no news action type is given or news action type is wrong', () => {
        const stateBefore = fromJS({});

        const action = {
            type: 'NON_EXISTING_TYPE',
        };
        const actualState = newsReducer(stateBefore, action);

        expect(actualState, stateBefore);
    });
});
