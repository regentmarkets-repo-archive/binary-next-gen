import * as types from '../_constants/ActionTypes';

export const updateNewsList = articles => ({
    type: types.UPDATE_NEWS_LIST,
    articles,
});
