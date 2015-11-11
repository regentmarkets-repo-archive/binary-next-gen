import { CHANGE_ACTIVE_VIDEO, UPDATE_VIDEO_LIST } from '../_constants/ActionTypes';

export const changeActiveVideo = (activeTitle, activeUrl) => {
    return {
        type: CHANGE_ACTIVE_VIDEO,
        activeTitle,
        activeUrl
    };
};

export const updateVideoList = (videos) => {
    return {
        type: UPDATE_VIDEO_LIST,
        videos
    };
};