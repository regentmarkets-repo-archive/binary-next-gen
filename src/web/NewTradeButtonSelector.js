import { createSelector } from 'reselect';

const symbolForNewTrade = createSelector(
    [state => state.workspace.get('activeTradeIndex'), state => state.trades],
    (actIdx, trades) => ({ symbol: trades.getIn([actIdx, 'symbol']) })
);

export default symbolForNewTrade;
