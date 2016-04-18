import { fromJS, Repeat } from 'immutable';
import {
    CHANGE_ACTIVE_LAYOUT,
    UPDATE_TRADE_PARAMS,
    UPDATE_MULTIPLE_TRADE_PARAMS,
    RESET_TRADES,
    REMOVE_TRADE,
    CREATE_TRADE,
    SERVER_DATA_PROPOSAL,
    REMOVE_PERSONAL_DATA,
} from '../_constants/ActionTypes';

const defaultTrade = {
    symbol: 'R_100',
    tradeCategory: 'risefall',
    duration: 5,
    durationUnit: 't',
    basis: 'stake',
    amount: 50,
    type: 'CALL',
    barrierType: 'relative',
    showAssetPicker: false,
};

const initialState = fromJS([defaultTrade]);

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TRADE: {
            const newSymbol = action.symbol || defaultTrade.symbol;
            const newTrade = fromJS(defaultTrade).set('symbol', newSymbol);

            return state.push(newTrade);
        }
        case CHANGE_ACTIVE_LAYOUT: {
            const oldTradesCount = state.size;
            const newTradesCount = action.tradesCount;
            const countDiff = newTradesCount - oldTradesCount;

            if (countDiff > 0) {
                const additionalTrade = Repeat(fromJS(defaultTrade), countDiff);   // eslint-disable-line new-cap
                return state.concat(additionalTrade);
            }

            if (countDiff < 0) {
                return state.take(newTradesCount);
            }

            return state;
        }
        case UPDATE_TRADE_PARAMS: {
            return state.setIn([action.index, action.fieldName], action.fieldValue);
        }
        case UPDATE_MULTIPLE_TRADE_PARAMS: {
            return state.mergeIn([action.index], action.params);
        }
        case RESET_TRADES: {
            return initialState;
        }
        case REMOVE_TRADE: {
            return state.remove(action.index);
        }
        case SERVER_DATA_PROPOSAL: {
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
