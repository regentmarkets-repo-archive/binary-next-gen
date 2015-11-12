import { UPDATE_DAILY_REPORT_LIST, UPDATE_CURRENT_DAILY_REPORT } from '../_constants/ActionTypes';

export const updateCurrentDailyReport = (dr) => ({
    type: UPDATE_CURRENT_DAILY_REPORT,
    current: {
        title: dr.title,
        dateTime: dr.dateTime,
        content: dr.content
    }
});

export const updateDailyReportList = (drList) => ({
    type: UPDATE_DAILY_REPORT_LIST,
    newList: drList
});
