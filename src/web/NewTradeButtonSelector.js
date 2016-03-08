import { createSelector } from 'reselect';

const newTrade = createSelector(
    [state => state.workspace.get('activeTradeIndex'), state => state.trades],
    (actIdx, trades) => ({
        symbol: trades.getIn([actIdx, 'symbol']),
        noOfTrades: trades.size,
    })
);

export default newTrade;
