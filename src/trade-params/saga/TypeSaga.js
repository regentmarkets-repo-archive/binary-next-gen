import { takeEvery } from 'redux-saga';
import { select, put } from 'redux-saga/effects';
import { getForceRenderCount, getParams, contractOfSymbol } from './SagaSelectors';
import { updateMultipleTradeParams, updateTradeUIState } from '../../_actions';
import * as paramUpdate from '../TradeParamsCascadingUpdates';
import { subscribeProposal, unsubscribeProposal } from './ProposalSubscriptionSaga';

const CHANGE_CATEGORY = 'CHANGE_CATEGORY';

export const reqCatChange = (index, category) => ({
    type: CHANGE_CATEGORY,
    index,
    category,
});

function* handleCatChange(action) {
    const { index, category } = action;
    yield put(unsubscribeProposal(index));
    const params = yield select(getParams(index));
    const contractNeeded = yield select(contractOfSymbol(params.symbol));
    const updated = paramUpdate.changeCategory(category, contractNeeded, params);
    const renderCount = yield select(getForceRenderCount(index));
    yield [
        put(subscribeProposal(index, updated)),
        put(updateMultipleTradeParams(index, updated)),
        put(updateTradeUIState(index, 'forceRenderCount', renderCount + 1)),
    ];
}

const CHANGE_TYPE = 'CHANGE_TYPE';

export const reqTypeChange = (index, category, tradeType) => ({
    type: CHANGE_TYPE,
    index,
    category,
    tradeType,
});

function* handleTypeChange(action) {
    const { index, category, tradeType } = action;
    yield put(unsubscribeProposal(index));
    const params = yield select(getParams(index));
    const contractNeeded = yield select(contractOfSymbol(params.symbol));
    const updated = paramUpdate.changeType(tradeType, category, contractNeeded, params);
    const renderCount = yield select(getForceRenderCount(index));
    yield [
        put(subscribeProposal(index, updated)),
        put(updateMultipleTradeParams(index, updated)),
        put(updateTradeUIState(index, 'forceRenderCount', renderCount + 1)),
    ];
}

export default function* watchTypeChange() {
    yield [
        takeEvery(CHANGE_CATEGORY, handleCatChange),
        takeEvery(CHANGE_TYPE, handleTypeChange),
    ];
}
