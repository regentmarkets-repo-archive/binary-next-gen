import { fromJS } from 'immutable';
import { UPDATE_VIDEO_LIST } from '../../_constants/ActionTypes';
import videoReducer from '../VideoReducer';
import { expect } from 'chai';

describe('videoReducer', () => {
    it('should update video list with the new list', () => {
        const action = {
            type: UPDATE_VIDEO_LIST,
            videos: ['ANGAMU', 'MAZA'],
        };
        const beforeState = fromJS([]);
        const actualState = videoReducer(beforeState, action);
        const expectedState = fromJS(['ANGAMU', 'MAZA']);
        expect(expectedState).to.equal(actualState);
    });

    it('should be able to return the initial or default state when action type is wrong or not given', () => {
        const action = {
            videos: ['ANGAMU', 'MAZA'],
        };
        const beforeState = fromJS([]);
        const actualState = videoReducer(beforeState, action);
        expect(actualState).to.equal(beforeState);
    });
});
