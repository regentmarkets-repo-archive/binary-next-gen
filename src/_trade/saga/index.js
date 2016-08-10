import { call } from 'redux-saga/effects';
import BarrierSaga from './BarrierSaga';
import DurationSaga from './DurationSaga';
import PurchaseSaga from './PurchaseSaga';
import SymbolSaga from './SymbolSaga';
import TypeSaga from './TypeSaga';
import ProposalSubscriptionSaga from './ProposalSubscriptionSaga';
import LifecycleWatcher from './LifeCycleSaga';

export default function* root() {
    yield [
        call(ProposalSubscriptionSaga),
        call(LifecycleWatcher),
        call(BarrierSaga),
        call(DurationSaga),
        call(PurchaseSaga),
        call(SymbolSaga),
        call(TypeSaga),
    ];
}
