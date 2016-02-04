import React, { PropTypes } from 'react';
import { Map, ToIndexedSequence } from 'immutable';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';
import { fullTradesSelector } from './../_selectors/FullTradeSelectors';
import TradesGrid from './TradesGrid';
import TradesTabs from './TradesTabs';

@connect(fullTradesSelector)
export default class TradesContainer extends React.Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    static propTypes = {
        assets: PropTypes.object,
        contracts: PropTypes.instanceOf(Map),
        trades: PropTypes.instanceOf(Map),
        tradesIds: PropTypes.instanceOf(ToIndexedSequence),
        ticks: PropTypes.instanceOf(Map),
        tradeMode: PropTypes.string.isRequired,
    };

    static defaultValues = {
        tradeMode: 'grid',
    };

    render() {
        const { assets, contracts, trades, tradesIds, tradeMode, ticks } = this.props;
        return tradeMode === 'grid' ?
                <TradesGrid
                    {...this.props}
                    assets={assets}
                    contracts={contracts.toJS()}
                    trades={trades.toJS()}
                    tradesIds={tradesIds.toJS()}
                    ticks={ticks.toJS()}
                /> :
                <TradesTabs
                    {...this.props}
                    assets={assets}
                    contracts={contracts.toJS()}
                    trades={trades.toJS()}
                    tradesIds={tradesIds.toJS()}
                    ticks={ticks.toJS()}
                />;
    }
}
