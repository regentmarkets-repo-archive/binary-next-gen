import { boughtContractsSelector, portfolioSelector, assetsSelector } from '../_store/directSelectors';
import { createSelector, createStructuredSelector } from 'reselect';
import pipsToDigits from 'binary-utils/lib/pipsToDigits';

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

const pipSizeSelector = createSelector(
    assetsSelector,
    contractToShow,
    (assets, contract) => {
        const symbolDetails = assets.find(a => a.get('symbol') === contract.get('underlying'));
        const pipSize = symbolDetails && pipsToDigits(symbolDetails.get('pip'));
        return pipSize;
    }
);

export default createStructuredSelector({
    // ticks: ticksSelector,
    ticks: dataToShow,
    contract: contractToShow,
    pipSize: pipSizeSelector,
});
