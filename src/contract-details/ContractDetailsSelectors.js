import {
    boughtContractsSelector,
    portfolioSelector,
    assetsSelector,
    themeSelector,
} from '../_store/directSelectors';
import { createSelector, createStructuredSelector } from 'reselect';
import pipsToDigits from 'binary-utils/lib/pipsToDigits';

export const contractToShow = createSelector(
    [state => portfolioSelector(state).get('contractShown'), boughtContractsSelector],
    (contractID, contracts) => {
        const contract = contracts.find(x => x.get('contract_id') === contractID);
        return contract;
    }
);

const contractWithBarrierType = createSelector(
    contractToShow,
    contract => contract && contract.set('barrierType', 'absolute')
);

export const dataToShow = createSelector(
    [state => portfolioSelector(state).get('contractShown'), state => state.chartData],
    (contractID, chartData) => chartData.find((v, k) => k === contractID)
);

export const pipSizeSelector = createSelector(
    [assetsSelector, contractToShow],
    (assets, contract) => {
        const symbolDetails = contract && assets.find(a => a.get('symbol') === contract.get('underlying'));
        const pipSize = symbolDetails && pipsToDigits(symbolDetails.get('pip'));
        return pipSize;
    }
);

export default createStructuredSelector({
    theme: themeSelector,
    chartData: dataToShow,
    contract: contractWithBarrierType,
    pipSize: pipSizeSelector,
});
