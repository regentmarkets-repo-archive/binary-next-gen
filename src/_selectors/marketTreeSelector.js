import { createSelector, createStructuredSelector } from 'reselect';
import { fromJS } from 'immutable';
import { assetsSelector } from '../_store/directSelectors';

// return a tree structure, hierarchy as [market -> submarket -> symbol]
export const marketTreeSelector = createSelector(
    assetsSelector,
    assets =>
        assets.reduce((tree, sym) => {
            let result = tree;
            const market = sym.get('market');
            const submarket = sym.get('submarket');
            const symbol = sym.get('symbol');

            if (!tree.has(market)) {
                result = result.set(market, fromJS({
                    display_name: sym.get('market_display_name'),
                    submarkets: {},
                }));
            }

            if (!tree.hasIn([market, 'submarkets', submarket])) {
                result = result.setIn([market, 'submarkets', submarket], fromJS({
                    display_name: sym.get('submarket_display_name'),
                    symbols: {},
                }));
            }

            if (!tree.hasIn([market, 'submarkets', submarket, 'symbols', symbol])) {
                result = result.setIn([market, 'submarkets', submarket, 'symbols', symbol], fromJS({
                    display_name: sym.get('display_name'),
                }));
            }

            return result;
        }, fromJS({}))
);

export default createStructuredSelector({
    marketTree: marketTreeSelector,
});
