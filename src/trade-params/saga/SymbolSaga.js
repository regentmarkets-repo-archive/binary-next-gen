import { takeEvery } from 'redux-saga';
import { put, select, fork } from 'redux-saga/effects';
import { updateMultipleTradeParams, updateTradingOptions, updateTradeUIState,
    updateFeedLicense, updateTradingOptionsErr } from '../../_actions';
import { api } from '../../_data/LiveData';
import * as paramUpdate from '../TradeParamsCascadingUpdates';
import { getForceRenderCount, getParams, contractOfSymbol, getTicksOfSymbol, isSymbolOpen } from './SagaSelectors';
import { createTrade } from './TradeParamSaga';
import { subscribeProposal, unsubscribeProposal } from './ProposalSubscriptionSaga';

const CHANGE_SYMBOL = 'CHANGE_SYMBOL';
export const reqSymbolChange = (index, symbol) => ({
    type: CHANGE_SYMBOL,
    index,
    symbol,
});

export function* tradeCreation(action) {
    const { index, symbol } = action;

    // unsubscribe and remove existing proposal
    yield put(unsubscribeProposal(index));

    const contractNeeded = yield select(contractOfSymbol(symbol));
    if (contractNeeded) {
        const params = yield select(getParams(index));
        const isOpen = yield select(isSymbolOpen(symbol));
        const updatedParams = paramUpdate.changeSymbol(symbol, contractNeeded, params, isOpen);
        yield put(updateMultipleTradeParams(index, updatedParams));

        const renderCount = yield select(getForceRenderCount(index));
        yield put(updateTradeUIState(index, 'forceRenderCount', renderCount + 1));

        yield put(subscribeProposal(index, updatedParams));
    } else {
        try {
            const { contracts_for } = yield api.getContractsForSymbol(symbol);
            const ticks = yield select(getTicksOfSymbol(symbol));
            const license = contracts_for.feed_license;
            if (!ticks) {
                switch (license) {
                    case 'chartonly': break;
                    case 'realtime':
                        yield fork(
                            api.getTickHistory,
                            symbol,
                            { end: 'latest', count: 60, adjust_start_time: 1, subscribe: 1 }
                            );
                        break;
                    case 'delayed':
                    case 'daily':
                        yield fork(
                            api.getTickHistory,
                            symbol,
                            { end: 'latest', count: 60, adjust_start_time: 1 }
                        );
                        break;
                    default:console.warn(`Unknown license type: ${license}`);   // eslint-disable-line no-console
                }
            }
            yield put(updateFeedLicense(symbol, license));
            yield put(updateTradingOptions(symbol, contracts_for.available));
            yield put(createTrade(index, symbol));
        } catch (err) {
            yield (updateTradingOptionsErr(symbol, err));
        }
    }
}

export default function* watchSymbol() {
    yield takeEvery(CHANGE_SYMBOL, tradeCreation);
}
