import { put, select, takeEvery, all } from 'redux-saga/effects';
import { updateMultipleTradeParams, updateTradingOptions, updateTradeUIState,
    updateFeedLicense, updateTradingOptionsErr } from '../../_actions';
import { api as CoreApi } from '../../_data/LiveData';
import changeSymbol from '../updates/changeSymbol';
import { getForceRenderCount, contractOfSymbol, isSymbolOpen, getParams } from './SagaSelectors';
import { subscribeProposal, unsubscribeProposal } from './ProposalSubscriptionSaga';

const CREATE_TRADE = 'CREATE_TRADE';
export const createTrade = (index, symbol) => ({
    type: CREATE_TRADE,
    index,
    symbol,
});

export function* tradeCreation(action) {
    const { index, symbol } = action;

    // unsubscribe and remove existing proposal
    yield put(unsubscribeProposal(index));

    const contractNeeded = yield select(contractOfSymbol(symbol));
    if (contractNeeded) {
        const isOpen = yield select(isSymbolOpen(symbol));
        const params = yield select(getParams(index));
        const updatedParams = changeSymbol(symbol, contractNeeded, params, isOpen);
        yield put(updateMultipleTradeParams(index, updatedParams));
        const renderCount = yield select(getForceRenderCount(index));
        yield all([
            put(updateTradeUIState(index, 'forceRenderCount', renderCount + 1)),
            put(subscribeProposal(index, updatedParams)),
        ]);
    } else {
        try {
            const { contracts_for } = yield CoreApi.getContractsForSymbol(symbol);
            const license = contracts_for.feed_license;

            yield all([
                put(updateFeedLicense(symbol, license)),
                put(updateTradingOptions(symbol, contracts_for.available)),
                put(createTrade(index, symbol)),
            ]);
        } catch (err) {
            if (!err.error || !err.error.error) {
                throw err;                  // rethrow error that we do not expect
            }
            yield put(updateTradingOptionsErr(symbol, err.error.error.message));
        }
    }
}

const DESTROY_TRADE = 'DESTROY_TRADE';
export const destroyTrade = index => ({
    type: DESTROY_TRADE,
    index,
});

export function* tradeDestruction(action) {
    const { index } = action;
    yield put(unsubscribeProposal(index));
}

export default function* lifeCycleWatch() {
    yield all([
        takeEvery(CREATE_TRADE, tradeCreation),
        takeEvery(DESTROY_TRADE, tradeDestruction),
        ]);
}
