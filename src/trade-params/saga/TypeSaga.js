import { takeLatest } from 'redux-saga';
import { select, put } from 'redux-saga/effects';
import { getForceRenderCount, getParams, contractOfSymbol } from './SagaSelectors';
import { updateMultipleTradeParams, updateTradeUIState } from '../../_actions';
import * as paramUpdate from '../TradeParamsCascadingUpdates';

const CHANGE_CATEGORY = 'CHANGE_CATEGORY';

export const reqCatChange = (index, category) => ({
    type: CHANGE_CATEGORY,
    index,
    category,
});

function* handleCatChange(action) {
    const { index, category } = action;
    const params = yield select(getParams(index));
    const contractNeeded = yield select(contractOfSymbol(params.symbol));
    const updated = paramUpdate.changeCategory(category, contractNeeded, params);
    const renderCount = yield select(getForceRenderCount(index));
    yield [
        put(updateMultipleTradeParams(index, updated)),
        put(updateTradeUIState(index, 'forceRenderCount', renderCount + 1)),
    ];
}

const CHANGE_TYPE = 'CHANGE_TYPE';

export const reqTypeChange = (index, tradeType) => ({
    type: CHANGE_TYPE,
    index,
    tradeType,
});

function* handleTypeChange(action) {
    const { index, tradeType } = action;
    const params = yield select(getParams(index));
    const contractNeeded = yield select(contractOfSymbol(params.symbol));
    const updated = paramUpdate.changeType(tradeType, params.tradeCategory, contractNeeded, params);
    const renderCount = yield select(getForceRenderCount(index));
    yield [
        put(updateMultipleTradeParams(index, updated)),
        put(updateTradeUIState(index, 'forceRenderCount', renderCount + 1)),
    ];
}

export default function* watchTypeChange() {
    yield [
        takeLatest(CHANGE_CATEGORY, handleCatChange),
        takeLatest(CHANGE_TYPE, handleTypeChange),
    ];
}
