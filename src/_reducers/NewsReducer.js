import { Map } from 'immutable';
import {
    UPDATE_NEWS_LIST,
    UPDATE_CURRENT_DAILY_REPORT,
} from '../_constants/ActionTypes';


const initialState = new Map({
    current: {},
    articles: [],
});

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CURRENT_DAILY_REPORT: {
            return state.set('current', action.current);
        }
        case UPDATE_NEWS_LIST: {
            return state.set('articles', action.articles);
        }
        default :
            return state;
    }
};

export const getArticles = state => state.news.get('articles');

export const getArticle = (state, index) => state.news.get('articles')[index] || { };
