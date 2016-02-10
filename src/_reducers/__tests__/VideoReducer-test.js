import { fromJS } from 'immutable';
import { UPDATE_VIDEO_LIST } from '../../_constants/ActionTypes';
import videoReducer from '../VideoReducer';
import expect from 'expect';

describe('VideoReducer', () => {
    it('should update video list with the new list', () => {
        const action = {
            type: UPDATE_VIDEO_LIST,
            videos: ['ANGAMU', 'MAZA'],
        };
        const beforeState = fromJS([]);
        const actualState = videoReducer(beforeState, action);
        const expectedState = fromJS(['ANGAMU', 'MAZA']);
        expect(actualState).toEqual(expectedState);
    });

    it('should be able to return the initial or default state when action type is wrong or not given', () => {
        const action = {
            videos: ['ANGAMU', 'MAZA'],
        };
        const beforeState = fromJS([]);
        const actualState = videoReducer(beforeState, action);
        expect(actualState).toEqual(beforeState);
    });
});
