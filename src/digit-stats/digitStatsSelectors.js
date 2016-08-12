import { createSelector } from 'reselect';
import { pipsToDigits, calculateLastDigitStats } from 'binary-utils';
import { ticksSelector, workspaceSelector, digitStatsSelector,
    tradingOptionsSelector, assetsSelector } from '../_store/directSelectors';
import { examinedAssetSelector } from '../_store/commonSelectors';

export default createSelector(
    [examinedAssetSelector, ticksSelector, tradingOptionsSelector, digitStatsSelector, assetsSelector, workspaceSelector],
    (examinedAsset, ticks, tradingOptions, digitStats, assets) => {
        const symbol = examinedAsset.get('symbol');
        const assetSupportsDigit = examinedAsset &&
            tradingOptions.get(symbol) &&
            tradingOptions.get(symbol).some(opt => opt.contract_category === 'digits');

        const selectAssetTicks = assetSupportsDigit && ticks.get(symbol);
        if (!selectAssetTicks) return undefined;

        const pipSize = assets.find(a => a.get('symbol') === symbol).get('pip');
        const size = digitStats.get('filter');
        const lastTicks = selectAssetTicks.takeLast(size).toJS();

        return {
            filter: size,
            stats: calculateLastDigitStats(lastTicks, pipsToDigits(pipSize)),
            symbol,
        };
    }
);
