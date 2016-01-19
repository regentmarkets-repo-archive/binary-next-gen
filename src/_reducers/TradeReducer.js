import { fromJS } from 'immutable';
import { UPDATE_TRADE_PARAMS, INIT_TRADE, SERVER_DATA_PROPOSAL, DESTROY_ALL_TRADE, DESTROY_TRADE } from '../_constants/ActionTypes';

const initialState = fromJS({
    1: {
        symbol: 'R_100',
        tradeCategory: 'callput',
        duration: 5,
        durationUnit: 'd',
        basis: 'payout',
        amount: 100,
        type: 'CALL',
    },
});

export default (state = initialState, action) => {
    switch (action.type) {
        case INIT_TRADE: {
            return state.set(action.id, fromJS({
                symbol: 'R_100',
                tradeCategory: 'callput',
                duration: 5,
                durationUnit: 'd',
                basis: 'payout',
                amount: 100,
                type: 'CALL',
            }));
        }
        case UPDATE_TRADE_PARAMS: {
            return state.setIn([action.id, action.fieldName], action.fieldValue);
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
