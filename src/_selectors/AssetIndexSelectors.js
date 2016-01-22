import { createSelector, createStructuredSelector } from 'reselect';

export const assetsSelector = state => state.assets;

export default createStructuredSelector({
    assets: assetsSelector,
    marketTree: marketTreeSelector,
});
