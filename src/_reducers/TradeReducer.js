import { fromJS } from 'immutable';
import { UPDATE_TRADE_PARAMS, INIT_TRADE, SERVER_DATA_PROPOSAL } from '../_constants/ActionTypes';

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
            return state.set(action.id, {
                symbol: 'R_100',
                tradeCategory: 'callput',
                duration: 5,
                durationUnit: 'd',
                basis: 'payout',
                amount: 100,
                type: 'CALL',
            });
        }
        case UPDATE_TRADE_PARAMS: {
            return state.setIn([action.id, action.fieldName], action.fieldValue);
        }
        case SERVER_DATA_PROPOSAL: {
            if (action.serverResponse.error) {
                console.log('no proposal', action.serverResponse);
                return state;
            }
            const proposalID = action.serverResponse.proposal.id;
            const entry = state.findEntry(v => v.proposal ? v.proposal.id === proposalID : false);
            if (entry) {
                return state.setIn([entry[0], 'proposal'], action.serverResponse.proposal);
            }
            return state;
        }
        default: return state;
    }
};
