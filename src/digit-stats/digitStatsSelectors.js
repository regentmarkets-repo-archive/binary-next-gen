import { createSelector } from 'reselect';
import { pipsToDigits, calculateLastDigitStats } from 'binary-utils';
import { ticksSelector, digitStatsSelector,
    tradingOptionsSelector, assetsSelector } from '../_store/directSelectors';

export default createSelector(
    [ticksSelector, tradingOptionsSelector, digitStatsSelector, assetsSelector],
    (ticks, tradingOptions, digitStats, assets) => {
        const selectedAsset = assets.find(a => a.get('exchange_is_open') === 1).get('symbol');
        const assetSupportsDigit = selectedAsset &&
            tradingOptions.get(selectedAsset) &&
            tradingOptions.get(selectedAsset).some(opt => opt.contract_category === 'digits');

        const selectAssetTicks = assetSupportsDigit && ticks.get(selectedAsset);
        if (!selectAssetTicks) return undefined;

        const pipSize = assets.find(a => a.get('symbol') === selectedAsset).get('pip');
        const size = digitStats.get('filter');
        const lastTicks = selectAssetTicks.takeLast(size).toJS();

        return {
            filter: size,
            stats: calculateLastDigitStats(lastTicks, pipsToDigits(pipSize)),
            symbol: selectedAsset,
        };
    }
);
