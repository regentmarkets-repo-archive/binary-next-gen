import { fromJS, Repeat } from 'immutable';
import {
    CHANGE_ACTIVE_LAYOUT,
    CLOSE_CONTRACT_RECEPIT,
    UPDATE_TRADE_PARAMS,
    UPDATE_MULTIPLE_TRADE_PARAMS,
    RESET_TRADES,
    REMOVE_TRADE,
    CREATE_TRADE,
    SERVER_DATA_PROPOSAL,
    REMOVE_PERSONAL_DATA,
    UPDATE_TRADE_PROPOSAL,
    UPDATE_TRADE_PURCHASE_INFO,
    UPDATE_TRADE_UI_STATE,
} from '../_constants/ActionTypes';

const defaultTrade = {
    params: {
        symbol: 'R_100',
        tradeCategory: 'risefall',
        duration: 5,
        durationUnit: 't',
        basis: 'stake',
        amount: 50,
        type: 'CALL',
        barrierType: 'relative',
    },
    uiState: {
        showAssetPicker: false,
    },
    proposalInfo: {},
    purchaseInfo: {},
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
        case CLOSE_CONTRACT_RECEPIT: {
            return state.setIn([action.index, 'purchaseInfo', 'mostRecentContractId'], undefined);
        }
        case UPDATE_TRADE_PARAMS: {
            if (!state.get(action.index)) {
                return state;
            }
            return state.setIn([action.index, 'params', action.fieldName], action.fieldValue);
        }
        case UPDATE_MULTIPLE_TRADE_PARAMS: {
            if (!state.get(action.index)) {
                return state;
            }
            return state.mergeIn([action.index, 'params'], action.params);
        }
        case UPDATE_TRADE_PROPOSAL: {
            if (!state.get(action.index)) {
                return state;
            }
            const { index, fieldName, fieldValue } = action;
            return state.setIn([index, 'proposalInfo', fieldName], fieldValue);
        }
        case UPDATE_TRADE_PURCHASE_INFO: {
            if (!state.get(action.index)) {
                return state;
            }
            const { index, fieldName, fieldValue } = action;
            return state.setIn([index, 'purchaseInfo', fieldName], fieldValue);
        }
        case UPDATE_TRADE_UI_STATE: {
            if (!state.get(action.index)) {
                return state;
            }
            const { index, fieldName, fieldValue } = action;
            return state.setIn([index, 'uiState', fieldName], fieldValue);
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
                v.getIn(['proposalInfo', 'proposal']) ?
                    v.getIn(['proposalInfo', 'proposal']).id === proposalId :
                    false);
            if (entry) {
                return state.setIn([entry[0], 'proposalInfo', 'proposal'], action.serverResponse.proposal);
            }
            return state;
        }
        case REMOVE_PERSONAL_DATA: {
            return initialState;
        }
        default: return state;
    }
};
