import { Map } from 'immutable';

import {
    UPDATE_TRADING_TIMES_SUBMARKET,
    UPDATE_TRADING_TIMES_DATE,
    UPDATE_ASSET_INDEX_SUBMARKET,
    UPDATE_TRANSACTIONS_FILTER,
} from '../_constants/ActionTypes';

const initialState = new Map({
    tradingTimes: new Map({
        submarket: 'europe_africa',
        date: new Date(),
    }),
    assetIndex: new Map({
        submarketId: 'europe_africa',
    }),
    transactionsFilter: 0,
});

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_TRADING_TIMES_SUBMARKET: {
            return state.update('tradingTimes', v => v.merge({ submarket: action.submarket }));
        }
        case UPDATE_TRADING_TIMES_DATE: {
            return state.update('tradingTimes', v => v.merge({ date: action.date }));
        }
        case UPDATE_ASSET_INDEX_SUBMARKET: {
            return state.update('assetIndex', v => v.merge({ submarketId: action.submarket }));
        }
        case UPDATE_TRANSACTIONS_FILTER: {
            return state.set('transactionsFilter', action.transactionsFilter);
        }
        default:
            return state;
    }
};
