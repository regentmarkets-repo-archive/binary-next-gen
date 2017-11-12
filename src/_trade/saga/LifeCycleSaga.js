import { takeEvery } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
import { updateMultipleTradeParams, updateTradingOptions,
    updateFeedLicense, updateTradingOptionsErr } from '../../_actions';
import { api as CoreApi } from '../../_data/LiveData';
import changeSymbol from '../updates/changeSymbol';
import { contractOfSymbol, isSymbolOpen, getParams } from './SagaSelectors';
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
    const params = yield select(getParams(index));
    if (contractNeeded) {
        const isOpen = yield select(isSymbolOpen(symbol));
        const updatedParams = changeSymbol(symbol, contractNeeded, params, isOpen);
        yield put(updateMultipleTradeParams(index, updatedParams));
        yield [
            put(subscribeProposal(index, updatedParams)),
        ];
    } else {
        try {
            const { contracts_for } = yield CoreApi.getContractsForSymbol(symbol);
            const license = contracts_for.feed_license;

            // TODO: The line below should not be necessary; we are retrieving the
            // tradeParams from local storage, only to save it back again. However
            // for some reason the 'amount' attribute in tradeParams local storage
            // mysteriously gets mutated to the default stake ('amountDefault')...
            // Will you, brave engineer, be able locate the nefarious code??
            yield put(updateMultipleTradeParams(index, params));

            yield [
                put(updateFeedLicense(symbol, license)),
                put(updateTradingOptions(symbol, contracts_for.available)),
                put(createTrade(index, symbol)),
            ];
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
    yield [
        takeEvery(CREATE_TRADE, tradeCreation),
        takeEvery(DESTROY_TRADE, tradeDestruction),
        ];
}
