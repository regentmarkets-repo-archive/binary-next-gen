import { takeEvery } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
import { getParams, contractOfSymbol } from './SagaSelectors';
import { updateMultipleTradeParams, updateTradeError } from '../../_actions';
import * as paramUpdate from '../TradeParamsCascadingUpdates';
import { subscribeProposal, unsubscribeProposal } from './ProposalSubscriptionSaga';
import { noOfBarrierCorrect, barrierTooLong } from '../TradeParamsValidation';

const CHANGE_BARRIER = 'CHANGE_BARRIER';

export const reqBarrierChange = (index, barrier, pipSize, expiryType) => ({
    type: CHANGE_BARRIER,
    index,
    barrier,
    pipSize,
    expiryType,
});

export function* handleBarrierChange(action) {
    const { index, barrier, pipSize, expiryType } = action;
    yield put(unsubscribeProposal(index));
    const params = yield select(getParams(index));
    const { symbol, tradeCategory, type } = params;
    const contract = yield select(contractOfSymbol(symbol));

    if (!noOfBarrierCorrect(barrier, expiryType, contract[tradeCategory][type])) {
        yield put(updateTradeError(index, 'barrierError', 'Barrier must not be empty.'));
        return;
    }

    const updated = paramUpdate.changeBarrier(barrier, params);
    yield [
        put(subscribeProposal(index, updated)),
        put(updateMultipleTradeParams(index, updated)),
        put(updateTradeError(index, 'barrierError')),
        ];

    if (barrierTooLong(barrier, pipSize)) {
        yield put(updateTradeError(index, 'barrierError', `Barrier decimal too long, only allow ${pipSize} decimals`));
    }
}

export default function* watchBarrierChange() {
    yield takeEvery(CHANGE_BARRIER, handleBarrierChange);
}
