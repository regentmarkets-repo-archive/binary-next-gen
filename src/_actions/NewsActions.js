import { UPDATE_NEWS_LIST, UPDATE_CURRENT_DAILY_REPORT } from '../_constants/ActionTypes';

export const updateCurrentDailyReport = (dr) => ({
    type: UPDATE_CURRENT_DAILY_REPORT,
    current: {
        title: dr.title,
        dateTime: dr.dateTime,
        content: dr.content,
    },
});

export const updateNewsList = (drList) => ({
    type: UPDATE_NEWS_LIST,
    newList: drList,
});
