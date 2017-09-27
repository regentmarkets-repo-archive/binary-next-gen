import { createSelector, createStructuredSelector } from 'reselect';
import { pipsToDigits } from 'binary-utils';
import {
    fractionalDigitsSelector,
    boughtContractsSelector,
    portfolioSelector,
    assetsSelector,
    themeSelector,
} from '../_store/directSelectors';

export const contractToShow = createSelector(
    [state => portfolioSelector(state).get('contractShown'), boughtContractsSelector],
    (contractID, contracts) =>
        contracts.find(x => x.get('contract_id') === contractID)
);

const contractWithBarrierType = createSelector(
    [contractToShow, assetsSelector, fractionalDigitsSelector],
    (contract, assets, fractionalDigits) => {
        const symbol = contract && contract.get('underlying');
        const symbolDetails = assets.find(a => a.get('symbol') === symbol);
        const symbolName = symbolDetails && symbolDetails.get('display_name');
        const contractWithDigits = contract && contract.set('fractionalDigits', fractionalDigits);
        const contractWithSymbolName = contractWithDigits && contractWithDigits.set('symbolName', symbolName);
        return contractWithSymbolName && contractWithSymbolName.set('barrierType', 'absolute');
    }
);

export const dataToShow = createSelector(
    [state => portfolioSelector(state).get('contractShown'), state => state.chartData],
    (contractID, chartData) =>
        chartData.find((v, k) => k === contractID)
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
    contract: contractWithBarrierType,
    pipSize: pipSizeSelector,
});
