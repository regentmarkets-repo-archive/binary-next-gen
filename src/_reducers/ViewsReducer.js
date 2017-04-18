import { fromJS } from 'immutable';

import {
    UPDATE_TRADING_TIMES_DATE,
    UPDATE_TRADING_TIMES_FILTER,
    UPDATE_TRANSACTIONS_FILTER,
    UPDATE_ASSET_INDEX_FILTER,
} from '../_constants/ActionTypes';

const initialState = fromJS({
    tradingTimes: {
        filter: '',
        date: new Date(),
    },
    assetIndex: '',
    transactionsFilter: 0,
});

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_TRADING_TIMES_DATE: {
            return state.update('tradingTimes', v =>
                v.merge({ date: action.date }),
            );
        }
        case UPDATE_TRADING_TIMES_FILTER: {
            return state.update('tradingTimes', v =>
                v.merge({ filter: action.filter }),
            );
        }
        case UPDATE_ASSET_INDEX_FILTER: {
            return state.set('assetIndex', action.filter);
        }
        case UPDATE_TRANSACTIONS_FILTER: {
            return state.set('transactionsFilter', action.transactionsFilter);
        }
        default:
            return state;
    }
};
