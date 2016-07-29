import { availableContractsSelector } from '../TradeParamsSelector';

export const getProposalId = index => state => state.tradesProposalInfo.getIn([index, 'proposal'], {}).id;

export const contractOfSymbol = symbol => state => availableContractsSelector(state).get(symbol);

export const getParams = index => state => {
    const params = state.tradesParams.get(index);
    return params && params.toJS();
};

export const getForceRenderCount = index => state => state.tradesUIStates.getIn([index, 'forceRenderCount']);

export const getTicksOfSymbol = symbol => state => state.ticks.get(symbol);
