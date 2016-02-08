import { createStructuredSelector } from 'reselect';

export const articlesSelector = state => state.news.get('articles');

export default createStructuredSelector({
     articles: articlesSelector,
});
