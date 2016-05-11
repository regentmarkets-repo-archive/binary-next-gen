import { fromJS, Repeat } from 'immutable';
import {
    CHANGE_ACTIVE_LAYOUT,
    RESET_TRADES,
    REMOVE_TRADE,
    CREATE_TRADE,
    SERVER_DATA_PROPOSAL,
    REMOVE_PERSONAL_DATA,
    UPDATE_TRADE_PROPOSAL,
} from '../../_constants/ActionTypes';

const defaultProposalInfo = {};

const initialState = fromJS([defaultProposalInfo]);

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TRADE: {
            return state.push(defaultProposalInfo);
        }
        case CHANGE_ACTIVE_LAYOUT: {
            const oldTradesCount = state.size;
            const newTradesCount = action.tradesCount;
            const countDiff = newTradesCount - oldTradesCount;

            if (countDiff > 0) {
                const additionalProposalInfo =
                    Repeat(fromJS(defaultProposalInfo), countDiff);   // eslint-disable-line new-cap
                return state.concat(additionalProposalInfo);
            }

            if (countDiff < 0) {
                return state.take(newTradesCount);
            }

            return state;
        }
        case UPDATE_TRADE_PROPOSAL: {
            if (!state.get(action.index)) {
                return state;
            }
            const { index, fieldName, fieldValue } = action;
            return state.setIn([index, fieldName], fieldValue);
        }
        case RESET_TRADES: {
            return initialState;
        }
        case REMOVE_TRADE: {
            if (!state.get(action.index)) {
                return state;
            }
            return state.remove(action.index);
        }
        case SERVER_DATA_PROPOSAL: {
            const proposalId = action.serverResponse.proposal.id;
            const entry = state.findEntry(v =>
                v.get('proposal') ?
                    v.get('proposal').id === proposalId :
                    false);
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

