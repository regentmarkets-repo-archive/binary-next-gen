import { fromJS } from 'immutable';
import {
    UPDATE_TRADE_PARAMS,
    DESTROY_ALL_TRADE,
    DESTROY_TRADE,
    INIT_TRADE,
    SERVER_DATA_PROPOSAL,
    REMOVE_PERSONAL_DATA,
} from '../_constants/ActionTypes';

const defaultTrade = {
    symbol: 'R_100',
    tradeCategory: 'callput',
    duration: 5,
    durationUnit: 't',
    basis: 'stake',
    amount: 50,
    type: 'CALL',
    barrierType: 'relative',
};

const initialState = fromJS([defaultTrade]);

export default (state = initialState, action) => {
    switch (action.type) {
        case INIT_TRADE: {
            return state.push(defaultTrade);
        }
        case UPDATE_TRADE_PARAMS: {
            const result = state.setIn([action.id, action.fieldName], action.fieldValue);
            return result;
        }
        case DESTROY_ALL_TRADE: {
            return initialState;
        }
        case DESTROY_TRADE: {
            return state.delete(action.id);
        }
        case SERVER_DATA_PROPOSAL: {
            if (action.serverResponse.error) {
                return state;
            }
            const proposalId = action.serverResponse.proposal.id;
            const entry = state.findEntry(v => v.get('proposal') ? v.get('proposal').id === proposalId : false);
            if (entry) {
                return state.setIn([entry[0], 'proposal'], action.serverResponse.proposal);
            }
            return state;
        }
        case REMOVE_PERSONAL_DATA: {
            return initialState;
        }
        default: return state;
    }
};
