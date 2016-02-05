import { createSelector, createStructuredSelector } from 'reselect';
import { fromJS } from 'immutable';

export const assetsSelector = state => state.assets;

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

// export const submarketNameSelector = Object.keys(tree).map(market => {
//     const subs = tree[market].submarkets;
//     if (Object.keys(subs).indexOf(submarket) > -1) return subs[submarket].display_name;
// }).filter(name => !!name)[0];


export default createStructuredSelector({
    assets: assetsSelector,
    marketTree: marketTreeSelector,
//    submarketName: submarketNameSelector,
});
