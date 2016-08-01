import { takeEvery } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
import { getParams } from './SagaSelectors';
import { updateMultipleTradeParams } from '../../_actions';
import * as paramUpdate from '../TradeParamsCascadingUpdates';
import { subscribeProposal, unsubscribeProposal } from './ProposalSubscriptionSaga';

const CHANGE_BARRIER = 'CHANGE_BARRIER';

export const reqBarrierChange = (index, barrier) => ({
    type: CHANGE_BARRIER,
    index,
    barrier,
});

export function* handleBarrierChange(action) {
    const { index, barrier } = action;
    yield put(unsubscribeProposal(index));
    const params = yield select(getParams(index));
    const updated = paramUpdate.changeBarrier(barrier, params);
    yield [
        put(subscribeProposal(index, updated)),
        put(updateMultipleTradeParams(index, updated)),
        ];
}

export default function* watchBarrierChange() {
    yield takeEvery(CHANGE_BARRIER, handleBarrierChange);
}
