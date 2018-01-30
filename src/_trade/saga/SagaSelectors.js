import { availableTradingOptionsSelector, assetsIsOpenSelector } from '../../trade-params/TradeParamsSelector';

export const getProposalId = index => state =>
    state.tradesProposalInfo.getIn([index, 'proposal'], {}).id;

export const contractOfSymbol = symbol => state =>
    availableTradingOptionsSelector(state).get(symbol);

export const getParams = index => state => {
    const params = state.tradesParams.get(index);
    return params && params.toJS();
};

export const getTicksOfSymbol = symbol => state =>
    state.ticks.get(symbol);

export const isSymbolOpen = symbol => state =>
    assetsIsOpenSelector(state)[symbol].isOpen;
