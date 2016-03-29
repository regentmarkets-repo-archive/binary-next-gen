import { tradeTypes } from '../_constants/TradeParams';

export default text =>
    tradeTypes.find(x => x.text === text).value;
