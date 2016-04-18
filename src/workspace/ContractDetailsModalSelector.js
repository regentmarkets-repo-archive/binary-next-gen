import { portfolioSelector } from '../_store/directSelectors';
import { createStructuredSelector, createSelector } from 'reselect';

const contractToShow = createSelector(
    portfolioSelector,
    portfolio => portfolio.get('contractShown')
);

export default createStructuredSelector({
    contractShown: contractToShow,
});
