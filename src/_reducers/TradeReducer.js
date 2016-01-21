import { fromJS } from 'immutable';
import { stringIncrement } from '../_utils/StringUtils';
import {
    UPDATE_TRADE_PARAMS,
    DESTROY_ALL_TRADE,
    DESTROY_TRADE,
    INIT_TRADE,
    SERVER_DATA_PROPOSAL } from '../_constants/ActionTypes';

const initialState = fromJS({
    0: {
        symbol: 'R_100',
        tradeCategory: 'callput',
        duration: 5,
        durationUnit: 't',
        basis: 'payout',
        amount: 50,
        type: 'CALL',
        barrierType: 'relative',
    },
});

export default (state = initialState, action) => {
    switch (action.type) {
        case INIT_TRADE: {
            const newID = stringIncrement(action.id);
            if (state.has(newID)) {
                return state;
            }
            return state.set(newID.toString(), initialState.get('0'));
        }
        case UPDATE_TRADE_PARAMS: {
            const result = state.setIn([action.id, action.fieldName], action.fieldValue);
            return result;
        }
        case DESTROY_ALL_TRADE: {
            return initialState;
        }
        case DESTROY_TRADE: {
            if (state.size > 1) {
                return state.delete(action.id);
            }
            return state;
        }
        case SERVER_DATA_PROPOSAL: {
            if (action.serverResponse.error) {
                return state;
            }
            const proposalID = action.serverResponse.proposal.id;
            const entry = state.findEntry(v => v.get('proposal') ? v.get('proposal').id === proposalID : false);
            if (entry) {
                return state.setIn([entry[0], 'proposal'], action.serverResponse.proposal);
            }
            return state;
        }
        default: return state;
    }
};
