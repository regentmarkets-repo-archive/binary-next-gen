import { fromJS, Repeat } from 'immutable';
import {
    CHANGE_ACTIVE_LAYOUT,
    RESET_TRADES,
    REMOVE_TRADE,
    REMOVE_PERSONAL_DATA,
    UPDATE_TRADE_UI_STATE,
} from '../../_constants/ActionTypes';

const defaultUIState = {
    disabled: false,
    forceRenderCount: 0,
};

const initialState = fromJS([defaultUIState]);

export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_ACTIVE_LAYOUT: {
            const oldTradesCount = state.size;
            const newTradesCount = action.tradesCount;
            const countDiff = newTradesCount - oldTradesCount;

            if (countDiff > 0) {
                const additionalUIState = Repeat(fromJS(defaultUIState), countDiff);   // eslint-disable-line new-cap
                return state.concat(additionalUIState);
            }

            if (countDiff < 0) {
                return state.take(newTradesCount);
            }

            return state;
        }
        case UPDATE_TRADE_UI_STATE: {
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

