import { put, select, takeEvery, all } from 'redux-saga/effects';
import { updateMultipleTradeParams, updateTradeError } from '../../_actions';
import areAllTimeFieldsValid from '../validation/areAllTimeFieldsValid';
import changeDurationUnit from '../updates/changeDurationUnit';
import changeStartDate from '../updates/changeStartDate';
import { getParams, contractOfSymbol } from './SagaSelectors';
import { subscribeProposal, unsubscribeProposal } from './ProposalSubscriptionSaga';

const CHANGE_DURATION = 'CHANGE_DURATION';

export const reqDurationChange = (index, duration) => ({
    type: CHANGE_DURATION,
    index,
    duration,
});

export function* handleDurationChange(action) {
    const { index, duration } = action;
    yield put(unsubscribeProposal(index));
    const params = yield select(getParams(index));
    const { symbol, tradeCategory, type, durationUnit, dateStart } = params;
    const contractNeeded = yield select(contractOfSymbol(symbol));
    const contractPerType = contractNeeded[tradeCategory][type];
    const isDurationAllowed = areAllTimeFieldsValid(dateStart, duration, durationUnit, contractPerType);
    if (isDurationAllowed) {
        const updated = Object.assign(params, { duration });
        yield all([
            put(subscribeProposal(index, updated)),
            put(updateMultipleTradeParams(index, updated)),
            put(updateTradeError(index, 'durationError')),
        ]);
    } else {
        yield put(updateTradeError(index, 'durationError', 'Duration is out of range'));
    }
}


const CHANGE_DURATION_UNIT = 'CHANGE_DURATION_UNIT';

export const reqDurationUnitChange = (index, durationUnit) => ({
    type: CHANGE_DURATION_UNIT,
    index,
    durationUnit,
});

export function* handleDurationUnitChange(action) {
    const { index, durationUnit } = action;
    yield put(unsubscribeProposal(index));
    const params = yield select(getParams(index));
    const contractNeeded = yield select(contractOfSymbol(params.symbol));
    const updated = changeDurationUnit(durationUnit, contractNeeded, params);
    yield all([
        put(subscribeProposal(index, updated)),
        put(updateMultipleTradeParams(index, updated)),
        put(updateTradeError(index, 'durationError'))
    ]);
}

const CHANGE_START_DATE_EPOCH = 'CHANGE_START_DATE_EPOCH';

export const reqStartEpochChange = (index, epoch) => ({
    type: CHANGE_START_DATE_EPOCH,
    index,
    epoch,
});

export function* handleStartEpochChange(action) {
    const { index, epoch } = action;
    yield put(unsubscribeProposal(index));
    const params = yield select(getParams(index));
    const { symbol } = params;
    const contractNeeded = yield select(contractOfSymbol(symbol));
    const updated = changeStartDate(epoch, contractNeeded, params);
    yield all([
        put(subscribeProposal(index, updated)),
        put(updateMultipleTradeParams(index, updated)),
        put(updateTradeError(index, 'durationError')),
    ]);
}

export default function* watchDurationChange() {
    yield all([
        takeEvery(CHANGE_DURATION, handleDurationChange),
        takeEvery(CHANGE_DURATION_UNIT, handleDurationUnitChange),
        takeEvery(CHANGE_START_DATE_EPOCH, handleStartEpochChange),
    ]);
}
