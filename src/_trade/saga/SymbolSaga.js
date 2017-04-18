import { takeEvery } from 'redux-saga';
import { tradeCreation } from './LifeCycleSaga';

const CHANGE_SYMBOL = 'CHANGE_SYMBOL';
export const reqSymbolChange = (index, symbol) => ({
    type: CHANGE_SYMBOL,
    index,
    symbol,
});

export default function* watchSymbol() {
    yield takeEvery(CHANGE_SYMBOL, tradeCreation);
}
