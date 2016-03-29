import tradeTypeCodeToText from './tradeTypeCodeToText';
import typeHasBarrier from './typeHasBarrier';

export default (code, barrier) =>
    tradeTypeCodeToText(code) + (typeHasBarrier(code) ? ' ' + barrier : '');
