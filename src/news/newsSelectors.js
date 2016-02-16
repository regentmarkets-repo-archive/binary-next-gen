import { fromJS } from 'immutable';
import { createStructuredSelector } from 'reselect';

export const articlesSelector = state => state.news;
export const currentArticleSelector = state => state.news.get(0) || fromJS({});

export default createStructuredSelector({
     articles: articlesSelector,
     currentArticle: currentArticleSelector,
});
