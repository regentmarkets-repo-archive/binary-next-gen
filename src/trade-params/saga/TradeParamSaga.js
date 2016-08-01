import { takeEvery } from 'redux-saga';
import { call } from 'redux-saga/effects';
import BarrierSaga from './BarrierSaga';
import DurationSaga from './DurationSaga';
import PurchaseSaga from './PurchaseSaga';
import SymbolSaga, { tradeCreation } from './SymbolSaga';
import TypeSaga from './TypeSaga';
import ProposalSubscriptionSaga from './ProposalSubscriptionSaga';

function* logger(action) {
    console.log('action', action);
}

const CREATE_TRADE = 'CREATE_TRADE';
export const createTrade = (index, symbol) => ({
    type: CREATE_TRADE,
    index,
    symbol,
});

function* watchCreate() {
    yield takeEvery(CREATE_TRADE, tradeCreation);
}

export default function* root() {
    yield [
        call(ProposalSubscriptionSaga),
        call(watchCreate),
        call(BarrierSaga),
        call(DurationSaga),
        call(PurchaseSaga),
        call(SymbolSaga),
        call(TypeSaga),
    ];
}
