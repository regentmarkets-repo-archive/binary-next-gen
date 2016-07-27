import { fromJS, Repeat } from 'immutable';
import {
    CHANGE_ACTIVE_LAYOUT,
    UPDATE_TRADE_PARAMS,
    UPDATE_MULTIPLE_TRADE_PARAMS,
    RESET_TRADES,
    REMOVE_TRADE,
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
    barrierType: undefined,
    barrier: undefined,
    barrier2: undefined,
};

const initialState = fromJS([defaultParams]);

export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_ACTIVE_LAYOUT: {
            const oldTradesCount = state.size;
            const newTradesCount = action.tradesCount;
            const countDiff = newTradesCount - oldTradesCount;

            if (countDiff > 0) {
                const { assetChoices } = action;
                if (assetChoices && assetChoices.length < countDiff) {
                    throw new Error('Not enough asset choices to create more trade');
                }
                const additionalTradeParams = Repeat(fromJS(defaultParams), countDiff);  // eslint-disable-line new-cap

                if (assetChoices) {
                    return state
                        .concat(additionalTradeParams.map((v, i) => v.set('symbol', assetChoices[i])));
                }

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
            return state.updateIn([action.index], action.params, v => v.merge(action.params));
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

