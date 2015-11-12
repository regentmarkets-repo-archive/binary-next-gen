import { Map } from 'immutable';
import {UPDATE_DAILY_REPORT_LIST, UPDATE_CURRENT_DAILY_REPORT} from '../_constants/ActionTypes';


const initialState = new Map({
    current: {
        title: "",
        dateTime: "",
        content: ""
    },
    dailyReports: []
});

export default (state=initialState, action) => {
    switch(action.type) {
        case UPDATE_CURRENT_DAILY_REPORT: {
            return state.set('current', action.current);
        }
        case UPDATE_DAILY_REPORT_LIST: {
            return state.set('dailyReports', action.newList);
        }
        default :
            return state;
    }
}