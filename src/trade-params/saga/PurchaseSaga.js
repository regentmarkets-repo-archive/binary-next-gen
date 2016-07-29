import { takeLatest } from 'redux-saga';
import { select, put } from 'redux-saga/effects';
import * as paramUpdate from '../TradeParamsCascadingUpdates';
import { updateMultipleTradeParams } from '../../_actions';
import { getParams } from './SagaSelectors';

const CHANGE_STAKE = 'CHANGE_STAKE';
const PURCHASE = 'PURCHASE';


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

function* handleStakeChange(action) {
    const { index, stake } = action;
    const params = yield select(getParams(index));
    const updated = paramUpdate.changeAmount(stake, params);
    yield put(updateMultipleTradeParams(index, updated));
}

export default function* watchPurchase() {
    yield takeLatest(CHANGE_STAKE, handleStakeChange);
}
