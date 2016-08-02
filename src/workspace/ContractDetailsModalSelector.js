import { createStructuredSelector, createSelector } from 'reselect';
import { portfolioSelector } from '../_store/directSelectors';

const contractToShow = createSelector(
    portfolioSelector,
    portfolio => portfolio.get('contractShown')
);

export default createStructuredSelector({
    contractShown: contractToShow,
});
