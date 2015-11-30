import { fromJS, List } from 'immutable';

import {
    WORKSPACE_ASSET_SELECT,
    SERVER_DATA_PROPOSAL,
    UPDATE_TICK_TRADE_PARAMETERS,
    SERVER_DATA_BUY,
    SERVER_DATA_TICK_HISTORY,
    SERVER_DATA_TICK_STREAM,
    DISCARD_PURCHASE_RECEIPT,
    CLEAR_TRADE_TICKS,
} from '../_constants/ActionTypes';

const initialState = fromJS({
    assetSymbol: 'R_100',
    tradeType: 'CALL',
    duration: 5,
    basis: 'payout',
    currency: 'USD',
    amount: 100,
    ticks: [
        {quote: 0}, {quote: 0}, {quote: 0}, {quote: 0}, {quote: 0},
        {quote: 0}, {quote: 0}, {quote: 0}, {quote: 0}, {quote: 0},
        {quote: 0}, {quote: 0}, {quote: 0}, {quote: 0}, {quote: 0},
        {quote: 0}, {quote: 0}, {quote: 0}, {quote: 0}, {quote: 0},
    ],
});

export default (state = initialState, action) => {
    switch (action.type) {
        case CLEAR_TRADE_TICKS: {
            return state.set('ticks', fromJS([{quote: 0}]));
        }
        case WORKSPACE_ASSET_SELECT: {
            return state.merge({ 'assetSymbol': action.symbol });
        }
        case UPDATE_TICK_TRADE_PARAMETERS: {
            return state.merge(action.parameters);
        }
        case SERVER_DATA_PROPOSAL: {
            return state.merge(action.serverResponse.proposal);
        }
        case SERVER_DATA_BUY: {
            return state.set('receipt', fromJS(action.serverResponse.buy));
        }
        case DISCARD_PURCHASE_RECEIPT: {
            return state.delete('receipt');
        }
        case SERVER_DATA_TICK_HISTORY: {
            const symbol = action.serverResponse.echo_req.ticks;
            if (state.get('assetSymbol') !== symbol) return state;

            const {history} = action.serverResponse;
            const ticks = history.times.map((x, i) => ({
                epoch: history.times[i],
                quote: +history.prices[i],
            }));
            return state.set('ticks', fromJS(ticks));
        }
        case SERVER_DATA_TICK_STREAM: {
            const symbol = action.serverResponse.echo_req.ticks;
            if (state.get('assetSymbol') !== symbol) return state;

            const { tick } = action.serverResponse;
            const newTick = {
                epoch: tick.epoch,
                quote: +tick.quote,
            };
            return state.update('ticks', List.of(newTick), v => v.takeLast(20).push(newTick));
        }
        default:
            return state;
    }
};
