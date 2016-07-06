import { fromJS, Repeat } from 'immutable';
import {
    CHANGE_ACTIVE_LAYOUT,
    UPDATE_TRADE_PARAMS,
    UPDATE_MULTIPLE_TRADE_PARAMS,
    RESET_TRADES,
    REMOVE_TRADE,
    CREATE_TRADE,
    REMOVE_PERSONAL_DATA,
} from '../../_constants/ActionTypes';

const defaultParams = {
    symbol: 'R_100',
    tradeCategory: 'risefall',
    duration: 5,
    durationUnit: 't',
    basis: 'stake',
    amount: 50,
    type: 'CALL',
    barrierType: 'relative',
};

const initialState = fromJS([defaultParams]);

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TRADE: {
            const newSymbol = action.symbol || defaultParams.symbol;
            const newTrade = fromJS(defaultParams).set('symbol', newSymbol);

            return state.push(newTrade);
        }
        case CHANGE_ACTIVE_LAYOUT: {
            const oldTradesCount = state.size;
            const newTradesCount = action.tradesCount;
            const countDiff = newTradesCount - oldTradesCount;

            if (countDiff > 0) {
                const additionalTradeParams = Repeat(fromJS(defaultParams), countDiff);   // eslint-disable-line new-cap
                return state.concat(additionalTradeParams);
            }

            if (countDiff < 0) {
                return state.take(newTradesCount);
            }

            return state;
        }
        case UPDATE_TRADE_PARAMS: {
            if (!state.get(action.index)) {
                return state;
            }
            return state.setIn([action.index, action.fieldName], action.fieldValue);
        }
        case UPDATE_MULTIPLE_TRADE_PARAMS: {
            if (!state.get(action.index)) {
                return state;
            }
            return state.updateIn([action.index], v => v.merge(action.params));
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

