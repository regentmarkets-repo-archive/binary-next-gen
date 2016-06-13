import { createSelector, createStructuredSelector } from 'reselect';
import {
    ticksSelector,
    workspaceSelector,
    digitStatsSelector,
    tradingOptionsSelector,
    assetsSelector,
} from '../_store/directSelectors';
import digitsToPips from 'binary-utils/lib/pipsToDigits';

const getLastDigit = (value, pip) =>
    +value.toFixed(pip).slice(-1);

export const selectSymbolDigitStat = createSelector(
    [ticksSelector, workspaceSelector, tradingOptionsSelector, digitStatsSelector, assetsSelector],
    (ticks, workspace, tradingOptions, digitStats, assets) => {
         const selectedAsset = workspace.get('selectedAsset');
         const assetSupportDigit = selectedAsset &&
             tradingOptions.get(selectedAsset) &&
             tradingOptions.get(selectedAsset).some(opt => opt.contract_category === 'digits');
         const selectAssetTicks = assetSupportDigit && ticks.get(selectedAsset);
         if (selectAssetTicks) {
              const pipSize = digitsToPips(assets.find(a => a.get('symbol') === selectedAsset).get('pip'));
              const size = digitStats.get('filter');
              const previousDigits = selectAssetTicks.takeLast(size).map(t => getLastDigit(t.get('quote'), pipSize));
              return previousDigits.reduce((a, b) => {
                   a[b] += 1;
                   return a;
              }, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
         }
         return [];
    }
);

export default createStructuredSelector({
     stats: selectSymbolDigitStat,
});
