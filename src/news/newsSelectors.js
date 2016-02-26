import { createStructuredSelector } from 'reselect';

export const articlesSelector = state => state.news;

export default createStructuredSelector({
     articles: articlesSelector,
});
