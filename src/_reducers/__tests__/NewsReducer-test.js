import expect from 'expect';
import {Map,fromJS} from 'immutable'
import NewsReducer,{getArticles,getArticle} from '../NewsReducer';
import {
    UPDATE_NEWS_LIST,
    UPDATE_CURRENT_DAILY_REPORT,
} from '../../_constants/ActionTypes';

describe('NewsReducer',()=>{
    it('should update current daily list with the new list',()=>{
        const stateBefore = new Map({});
        const action = {
            type: UPDATE_CURRENT_DAILY_REPORT,
            current: {title: 'current title', description: 'current description'}
        };
        const actualState = NewsReducer(stateBefore,action);
        const expectedState = new Map({
            current: {
                title: 'current title',
                description: 'current description',
            },
        });
        expect(actualState).toEqual(expectedState);
    });

    it('should update news list with the new list',()=>{
        const stateBefore = new Map({});
        const action = {
            type: UPDATE_NEWS_LIST,
            articles: ['current title','current description'],
        };
        const expectedState = new Map({
            articles: ['current title','current description'],
        });
        const actualState = NewsReducer(stateBefore,action);
        expect(actualState).toEqual(expectedState);
    });

    it('should return the same news/artciles state when no news action type is given or news action type is wrong',()=>{
        const stateBefore = new Map({});

        const action = {
            type: 'NON_EXISTING_TYPE',
        };
        const actualState = NewsReducer(stateBefore,action);
        expect(actualState,stateBefore);
    });

    it('should fetch all articles ',()=>{
        const state = {
            news: new Map({
                articles:['article 1', 'article 2', 'article 3'],
            }),
        };
        const actualState = getArticles(state);
        const expectedState = ['article 1', 'article 2', 'article 3'];
        expect(actualState).toEqual(expectedState);

    });

    it('should be able to fetch an article by index',()=>{
        const state = {
            news: new Map({
                articles:['article 1', 'article 2', 'article 3'],
            }),
        };
        const actualState = getArticle(state,1);
        const expectedState = 'article 2';
        expect(actualState).toEqual(expectedState);
    });
});