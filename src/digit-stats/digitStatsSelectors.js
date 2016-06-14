import { createSelector, createStructuredSelector } from 'reselect';
import calculateLastDigitStats from 'binary-utils/lib/calculateLastDigitStats';
import {
    ticksSelector,
    workspaceSelector,
    digitStatsSelector,
    tradingOptionsSelector,
    assetsSelector,
} from '../_store/directSelectors';
import digitsToPips from 'binary-utils/lib/pipsToDigits';

export const selectSymbolDigitStat = createSelector(
    [ticksSelector, workspaceSelector, tradingOptionsSelector, digitStatsSelector, assetsSelector],
    (ticks, workspace, tradingOptions, digitStats, assets) => {
         const selectedAsset = workspace.get('selectedAsset');
         const assetSupportDigit = selectedAsset &&
             tradingOptions.get(selectedAsset) &&
             tradingOptions.get(selectedAsset).some(opt => opt.contract_category === 'digits');
         const selectAssetTicks = assetSupportDigit && ticks.get(selectedAsset);
         if (!selectAssetTicks) return [];

          const pipSize = digitsToPips(assets.find(a => a.get('symbol') === selectedAsset).get('pip'));
          const size = digitStats.get('filter');
          const lastTicks = selectAssetTicks.takeLast(size).toJS();

          return calculateLastDigitStats(lastTicks, pipSize);
    }
);

export default createStructuredSelector({
    filter: state => state.digitStats.get('filter'),
    stats: selectSymbolDigitStat,
});
