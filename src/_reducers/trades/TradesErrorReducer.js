import { fromJS, Repeat, OrderedMap } from 'immutable';
import {
    CHANGE_ACTIVE_LAYOUT,
    RESET_TRADES,
    REMOVE_TRADE,
    CREATE_TRADE,
    REMOVE_PERSONAL_DATA,
    UPDATE_TRADE_ERROR,
} from '../../_constants/ActionTypes';

const defaultError = new OrderedMap({
    durationError: undefined,
    barrierError: undefined,
    stakeError: undefined,
    proposalError: undefined,
    contractForError: undefined,
});

const initialState = fromJS([defaultError]);

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TRADE: {
            return state.push(defaultError);
        }
        case CHANGE_ACTIVE_LAYOUT: {
            const oldTradesCount = state.size;
            const newTradesCount = action.tradesCount;
            const countDiff = newTradesCount - oldTradesCount;

            if (countDiff > 0) {
                const additionalError = Repeat(fromJS(defaultError), countDiff);   // eslint-disable-line new-cap
                return state.concat(additionalError);
            }

            if (countDiff < 0) {
                return state.take(newTradesCount);
            }

            return state;
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
        case UPDATE_TRADE_ERROR: {
            const { index, errorID, error } = action;
            return state.setIn([index, errorID], error);
        }
        default: return state;
    }
};


