import { Map } from 'immutable';

import {
    UPDATE_TRADING_TIMES_DATE,
    UPDATE_TRADING_TIMES_FILTER,
    UPDATE_TRANSACTIONS_FILTER,
    UPDATE_ASSET_INDEX_FILTER,
} from '../_constants/ActionTypes';

const initialState = new Map({
    tradingTimes: new Map({
        submarket: 'europe_africa',
        filter: 'europe_africa',
        date: new Date(),
    }),
    assetIndex: new Map({
        submarketId: 'europe_africa',
        filter: 'europe_africa',
    }),
    transactionsFilter: 0,
});

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_TRADING_TIMES_DATE: {
            return state.update('tradingTimes', v => v.merge({ date: action.date }));
        }
        case UPDATE_TRADING_TIMES_FILTER: {
            return state.update('tradingTimes', v => v.merge({ filter: action.filter }));
        }
        case UPDATE_ASSET_INDEX_FILTER: {
            return state.update('assetIndex', v => v.merge({ filter: action.filter }));
        }
        case UPDATE_TRANSACTIONS_FILTER: {
            return state.set('transactionsFilter', action.transactionsFilter);
        }
        default:
            return state;
    }
};
