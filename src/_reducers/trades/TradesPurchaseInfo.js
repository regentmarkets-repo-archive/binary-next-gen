import { fromJS, Repeat } from 'immutable';
import {
    CHANGE_ACTIVE_LAYOUT,
    CLOSE_CONTRACT_RECEPIT,
    RESET_TRADES,
    REMOVE_TRADE,
    CREATE_TRADE,
    REMOVE_PERSONAL_DATA,
    UPDATE_TRADE_PURCHASE_INFO,
} from '../../_constants/ActionTypes';

const defaultPurchaseInfo = {};

const initialState = fromJS([defaultPurchaseInfo]);

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TRADE: {
            return state.push(defaultPurchaseInfo);
        }
        case CHANGE_ACTIVE_LAYOUT: {
            const oldTradesCount = state.size;
            const newTradesCount = action.tradesCount;
            const countDiff = newTradesCount - oldTradesCount;

            if (countDiff > 0) {
                const additionalPurchaseInfo =
                    Repeat(fromJS(defaultPurchaseInfo), countDiff);   // eslint-disable-line new-cap
                return state.concat(additionalPurchaseInfo);
            }

            if (countDiff < 0) {
                return state.take(newTradesCount);
            }

            return state;
        }
        case CLOSE_CONTRACT_RECEPIT: {
            return state.setIn([action.index, 'mostRecentContractId'], undefined);
        }
        case UPDATE_TRADE_PURCHASE_INFO: {
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
        case REMOVE_PERSONAL_DATA: {
            return initialState;
        }
        default: return state;
    }
};

