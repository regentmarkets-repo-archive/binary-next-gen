import { tradeTypes } from '../_constants/TradeParams';

export default type =>
    !!tradeTypes.find(x => x.value === type).barrier;
