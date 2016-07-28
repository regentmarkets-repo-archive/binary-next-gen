import { takeEvery, takeLatest } from 'redux-saga';
import { put, call, select } from 'redux-saga/effects';

import { updateMultipleTradeParams, updateTradingOptions,
    updateFeedLicense, updateTradingOptionsErr } from '../_actions';
import { createDefaultTradeParams } from './DefaultTradeParams';
import { availableContractsSelector } from './TradeParamsSelector';
import { api } from '../_data/LiveData';

const CREATE_TRADE = 'CREATE_TRADE';
export const createTrade = (index, symbol) => ({
    type: CREATE_TRADE,
    index,
    symbol,
});

const CHANGE_SYMBOL = 'CHANGE_SYMBOL';
const CHANGE_CATEGORY = 'CHANGE_CATEGORY';
const CHANGE_TYPE = 'CHANGE_TYPE';
const CHANGE_DURATION = 'CHANGE_DURATION';
const CHANGE_STARTDATE = 'CHANGE_STARTDATE';
const CHANGE_BARRIER = 'CHANGE_BARRIER';
const CHANGE_STAKE = 'CHANGE_STAKE';
const PURCHASE = 'PURCHASE';

export const reqSymbolChange = (index, symbol) => ({
    type: CHANGE_SYMBOL,
    index,
    symbol,
});

export const reqCatChange = (index, category) => ({
    type: CHANGE_CATEGORY,
    index,
    category,
});

export const reqTypeChange = (index, tradeType) => ({
    type: CHANGE_TYPE,
    index,
    tradeType,
});

export const reqDurationChange = (index, duration) => ({
    type: CHANGE_DURATION,
    index,
    ...duration,
});

export const reqStartDateChange = (index, dateStart) => ({
    type: CHANGE_STARTDATE,
    dateStart,
});

export const reqBarrierChange = (index, barrier) => ({
    type: CHANGE_BARRIER,
    index,
    barrier,
});

export const reqStakeChange = (index, stake) => ({
    type: CHANGE_STAKE,
    index,
    stake,
});

export const reqPurchase = (index, params) => ({
    type: PURCHASE,
    index,
    params,
});

const REMOVE_TRADE = 'REMOVE_TRADE';
export const removeTrade = index => ({
    type: REMOVE_TRADE,
    index,
});

/* SAGAs */

function* tradeCreation(action) {
    const { index, symbol } = action;

    const allTradingOptions = yield select(availableContractsSelector);
    const contractNeeded = allTradingOptions.get(symbol);

    if (contractNeeded) {
        const defaultParams = createDefaultTradeParams(contractNeeded);
        yield put(updateMultipleTradeParams(index, defaultParams));
    } else {
        yield put(updateMultipleTradeParams(index, { symbol }));
        try {
            const { contracts_for } = yield call(api.getContractsForSymbol, symbol);
            yield put(updateFeedLicense(symbol, contracts_for.feed_license));
            yield put(updateTradingOptions(symbol, contracts_for.available));
            tradeCreation(action);      // TODO!!: might be a bad idea
        } catch (err) {
            yield (updateTradingOptionsErr(symbol, err));
        }
    }
}

function* handleSymbolChange(action) {}
function* handleTypeChange(action) {}
function* handleDurationChange(action) {}
function* handleBarrierChange(action) {}
function* handleStakeChange(action) {}

function* logger(action) {
    console.log(action.type + 'is called');
}

function* paramChangeLogger() {
    yield takeEvery([CHANGE_BARRIER, CHANGE_CATEGORY, CHANGE_DURATION, CHANGE_STAKE,
        CHANGE_SYMBOL, CHANGE_TYPE, CREATE_TRADE, REMOVE_TRADE], logger);
}

function* watchTradeCreation() {
    yield takeEvery(CREATE_TRADE, tradeCreation);
}

export default function* root() {
    yield [
        watchTradeCreation(),
        paramChangeLogger(),
    ];
}
