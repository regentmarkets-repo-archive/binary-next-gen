import { Map } from 'immutable';
import { NEXT_VIDEO, PREVIOUS_VIDEO } from '../_constants/ActionTypes'

const initialState = new Map({
    urls: ['https://www.youtube.com/watch?v=zQJy9sFHU38'],
    currentIndex: 0
});

export default (state=initialState, action) => {
    switch (action.type) {
        case NEXT_VIDEO: {
            const totalUrlSize = state.get('urls').length;
            const oldIdx = state.get('currentIndex');
            const newIdx = (oldIdx + 1) % totalUrlSize;
            return state.set('currentIdx', newIdx);
        }
        case PREVIOUS_VIDEO: {
            const totalUrlSize = state.get('urls').length;
            const oldIdx = state.get('currentIndex');
            const newIdx = (oldIdx - 1) < 0 ? (totalUrlSize - 1) : (oldIdx - 1);
            return state.set('currentIdx', newIdx);
        }
        default : {
            return state;
        }
    }
}