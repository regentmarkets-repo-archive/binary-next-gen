import { Map } from 'immutable';
import { CHANGE_ACTIVE_VIDEO, UPDATE_VIDEO_LIST } from '../_constants/ActionTypes';

const initialState = new Map({
    activeTitle: 'Daily Financial News by: Binary.com - Nov 10th, 2015',
    activeUrl: 'https://www.youtube.com/watch?v=3LPy5-7HFLI',

    videos: [{
        imgSrc: 'https://pbs.twimg.com/profile_images/567285191169687553/7kg_TF4l.jpeg',
        title: 'Cute Cat',
        videoUrl: 'https://www.youtube.com/watch?v=dZEnQogAd8U',
    }],
});

export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_ACTIVE_VIDEO: {
            return state.
                set('activeUrl', action.activeUrl).
                set('activeTitle', action.activeTitle);
        }

        case UPDATE_VIDEO_LIST: {
            return state.set('videos', action.videos);
        }

        default : {
            return state;
        }
    }
};
