import { takeEvery, takeLatest } from 'redux-saga';
import { put, call, select, fork } from 'redux-saga/effects';

import { updateMultipleTradeParams, updateTradingOptions, updateTradeUIState,
    updateFeedLicense, updateTradingOptionsErr, updateTradeProposal } from '../_actions';
import { currencySelector } from '../_store/directSelectors';
import { createDefaultTradeParams } from './DefaultTradeParams';
import { availableContractsSelector } from './TradeParamsSelector';
import { internalTradeModelToProposalModel } from '../trade/adapters/TradeObjectAdapter';
import { api } from '../_data/LiveData';
import debounce from 'lodash.debounce';
import * as paramUpdate from './TradeParamsCascadingUpdates';


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
    index,
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

const debounceSubscribe = debounce(params => api.subscribeToPriceForContractProposal(params), 300);

const getProposalId = index => state => state.tradesProposalInfo.getIn([index, 'proposal'], {}).id;

const contractOfSymbol = symbol => state => availableContractsSelector(state).get(symbol);

const existingParams = index => state => {
    const params = state.tradesParams.get(index);
    return params && params.toJS();
};

const getForceRenderCount = index => state => state.tradesUIStates.getIn([index, 'forceRenderCount']);

function* tradeCreation(action) {
    const { index, symbol } = action;

    // unsubscribe and remove existing proposal
    const oldProposalId = yield select(getProposalId(index));
    if (oldProposalId) {
        yield [
            api.unsubscribeByID(oldProposalId),
            put(updateTradeProposal(index, 'proposal')),
            ];
    }

    const contractNeeded = yield select(contractOfSymbol(symbol));
    if (contractNeeded) {
        const [params, currency] = yield [
            select(existingParams(index)),
            select(currencySelector),
            ];

        const updatedParams = paramUpdate.changeSymbol(symbol, contractNeeded, params);
        const subscribeParams = internalTradeModelToProposalModel(updatedParams, symbol, currency);
        yield put(updateMultipleTradeParams(index, updatedParams));

        const renderCount = yield select(getForceRenderCount(index));
        yield put(updateTradeUIState(index, 'forceRenderCount', renderCount + 1));

        const subscription = yield api.subscribeToPriceForContractProposal(subscribeParams);
        yield put(updateTradeProposal(index, 'proposal', subscription.proposal));
    } else {
        try {
            const { contracts_for } = yield call(api.getContractsForSymbol, symbol);

            yield put(updateFeedLicense(symbol, contracts_for.feed_license));
            yield put(updateTradingOptions(symbol, contracts_for.available));
            yield put(createTrade(index, symbol));
        } catch (err) {
            console.log('error ', err);
            yield (updateTradingOptionsErr(symbol, err));
        }
    }
}

function* handleCatChange(action) {
    const { index, category } = action;
    const params = yield select(existingParams(index));
    const contractNeeded = yield select(contractOfSymbol(params.symbol));
    const updated = paramUpdate.changeCategory(category, contractNeeded, params);
    const renderCount = yield select(getForceRenderCount(index));
    yield [
        put(updateMultipleTradeParams(index, updated)),
        put(updateTradeUIState(index, 'forceRenderCount', renderCount + 1)),
        ];
}

function* handleTypeChange(action) {
    const { index, tradeType } = action;
    const params = yield select(existingParams(index));
    const contractNeeded = yield select(contractOfSymbol(params.symbol));
    const updated = paramUpdate.changeType(tradeType, params.tradeCategory, contractNeeded, params);
    const renderCount = yield select(getForceRenderCount(index));
    yield [
        put(updateMultipleTradeParams(index, updated)),
        put(updateTradeUIState(index, 'forceRenderCount', renderCount + 1)),
    ];
}

function* handleDurationChange(action) {
    const { index, duration, durationUnit } = action;
    const params = yield select(existingParams(index));
    const contractNeeded = yield select(contractOfSymbol(params.symbol));
    const updated = paramUpdate.changeDuration(duration, durationUnit, contractNeeded, params);
    yield put(updateMultipleTradeParams(index, updated));
}

function* handleStartDateChange(action) {
    const { index, dateStart } = action;
    console.log(action);
    const params = yield select(existingParams(index));
    try {
    const contractNeeded = yield select(contractOfSymbol(params.symbol));
        const updated = paramUpdate.changeStartDate(dateStart, contractNeeded, params);
        yield put(updateMultipleTradeParams(index, updated));
    } catch (err) {
        console.log(err);
    }
}

function* handleBarrierChange(action) {
    const { index, barrier } = action;
    const params = yield select(existingParams(index));
    const updated = paramUpdate.changeBarrier(barrier, params);
    yield put(updateMultipleTradeParams(index, updated));
}

function* handleStakeChange(action) {
    const { index, stake } = action;
    const params = yield select(existingParams(index));
    const updated = paramUpdate.changeAmount(stake, params);
    yield put(updateMultipleTradeParams(index, updated));
}

function* logger(action) {
    console.log('action', action);
}

export default function* root() {
    yield [
        takeEvery(CREATE_TRADE, tradeCreation),
        takeEvery(
            [
                CHANGE_BARRIER, CHANGE_CATEGORY, CHANGE_DURATION, CHANGE_STAKE,
                CHANGE_SYMBOL, CHANGE_TYPE, CREATE_TRADE, REMOVE_TRADE,
            ],
            logger,
        ),
        takeLatest(CHANGE_SYMBOL, tradeCreation),
        takeLatest(CHANGE_CATEGORY, handleCatChange),
        takeLatest(CHANGE_TYPE, handleTypeChange),
        takeLatest(CHANGE_DURATION, handleDurationChange),
        takeLatest(CHANGE_STARTDATE, handleStartDateChange),
        takeLatest(CHANGE_BARRIER, handleBarrierChange),
        takeLatest(CHANGE_STAKE, handleStakeChange),
    ];
}
