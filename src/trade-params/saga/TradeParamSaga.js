import { call } from 'redux-saga/effects';
import BarrierSaga from './BarrierSaga';
import DurationSaga from './DurationSaga';
import PurchaseSaga from './PurchaseSaga';
import SymbolSaga from './SymbolSaga';
import TypeSaga from './TypeSaga';

function* logger(action) {
    console.log('action', action);
}

export default function* root() {
    yield [
        call(BarrierSaga),
        call(DurationSaga),
        call(PurchaseSaga),
        call(SymbolSaga),
        call(TypeSaga),
    ];
}
