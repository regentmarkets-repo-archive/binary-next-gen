import { tradeTypes } from '../_constants/TradeParams';

export default code =>
    tradeTypes.find(x => x.value === code).text;
