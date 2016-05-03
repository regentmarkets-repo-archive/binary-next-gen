import { boughtContractsSelector, portfolioSelector } from '../_store/directSelectors';
import { createSelector, createStructuredSelector } from 'reselect';

const contractToShow = createSelector(
    portfolioSelector,
    boughtContractsSelector,
    (portfolio, contracts) => contracts.find(x => x.get('contract_id') === portfolio.get('contractShown'))
);

const dataToShow = createSelector(
    portfolioSelector,
    state => state.chartData,
    (portfolio, chartData) => chartData.find((v, k) => k === portfolio.get('contractShown'))
);

export default createStructuredSelector({
    // ticks: ticksSelector,
    ticks: dataToShow,
    contract: contractToShow,
});
