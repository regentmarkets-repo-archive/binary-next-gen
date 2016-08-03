import { defaultMemoize, createSelectorCreator } from 'reselect';
import { is } from 'immutable';
import {
    assetsSelector,
    tradeProposalSelector,
    tradePurchaseInfoSelector,
    tradesErrorSelector,
    tradesUIStatesSelector,
    tradeParamsSelector,
} from '../_store/directSelectors';

const immutableEq = (a, b) => {
    if (a === b) return true;
    return is(a, b);
};

function immutableMemoize(func, eq = immutableEq) {
    return defaultMemoize(func, eq);
}

export function createImmutableSelector(...args) {
    return createSelectorCreator(immutableMemoize)(...args);
}

export const errorPerTrade = (state, props) => tradesErrorSelector(state).get(props.index);
export const proposalPerTrade = (state, props) => tradeProposalSelector(state).get(props.index);
export const uiStatePerTrade = (state, props) => tradesUIStatesSelector(state).get(props.index);
export const purchasePerTrade = (state, props) => tradePurchaseInfoSelector(state).get(props.index);
export const paramPerTrade = createImmutableSelector(
    [(state, props) => tradeParamsSelector(state).get(props.index), assetsSelector],
    (param, assets) => {
        if (!param) return undefined;
        const symbol = param.get('symbol');
        const symbolDetails = assets.find(a => a.get('symbol') === symbol);
        const symbolName = symbolDetails && symbolDetails.get('display_name');
        return param.set('symbolName', symbolName);
    }
);
