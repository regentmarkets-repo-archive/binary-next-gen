import { takeLatest } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
import { getParams } from './SagaSelectors';
import { updateMultipleTradeParams } from '../../_actions';
import * as paramUpdate from '../TradeParamsCascadingUpdates';

const CHANGE_BARRIER = 'CHANGE_BARRIER';

export const reqBarrierChange = (index, barrier) => ({
    type: CHANGE_BARRIER,
    index,
    barrier,
});

function* handleBarrierChange(action) {
    const { index, barrier } = action;
    const params = yield select(getParams(index));
    const updated = paramUpdate.changeBarrier(barrier, params);
    yield put(updateMultipleTradeParams(index, updated));
}

export default function* watchBarrierChange() {
    yield takeLatest(CHANGE_BARRIER, handleBarrierChange);
}
