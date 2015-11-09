import { Map } from 'immutable';
import { CHANGE_VIDEO } from '../_constants/ActionTypes'

const initialState = new Map({
    title: "Bla bla bla",
    url: 'https://www.youtube.com/watch?v=dZEnQogAd8U',
    videos: [{
        imgSrc: 'https://pbs.twimg.com/profile_images/567285191169687553/7kg_TF4l.jpeg',
        title: 'Cute Cat',
        videoUrl: 'https://www.youtube.com/watch?v=dZEnQogAd8U'
    }],
});

export default (state=initialState, action) => {
    switch (action.type) {
        case CHANGE_VIDEO: {
            return state.
                set('url', action.video.url).
                set('title', action.video.title);
        }
        default : {
            return state;
        }
    }
}