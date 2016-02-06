import { UPDATE_VIDEO_LIST } from '../_constants/ActionTypes';

export const updateVideoList = (videos) => ({
    type: UPDATE_VIDEO_LIST,
    videos,
});
