import { createStructuredSelector } from 'reselect';

export const videosSelector = state => state.video;

export default createStructuredSelector({
    videos: videosSelector,
});
