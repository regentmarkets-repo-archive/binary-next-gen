import React, { PropTypes, Component } from 'react';
import Tab from '../_common/Tab';
import TabList from '../_common/TabList';
import BaseTradeCard from '../fulltrade/FullTradeCard';

export default class TradesTabs extends Component {

    static propTypes = {
        actions: PropTypes.object.isRequired,
        activeTradeIndex: PropTypes.number.isRequired,
        ticks: PropTypes.object.isRequired,
        trades: PropTypes.array.isRequired,
        contracts: PropTypes.object.isRequired,
    };

    render() {
        const { actions, activeTradeIndex, contracts, trades, ticks } = this.props;
        const activeTrade = trades[activeTradeIndex];

        return (
            <div className="trades-tabs">
                <TabList
                    activeIndex={activeTradeIndex}
                    onChange={index => () => actions.changeActiveTrade(index)}
                >
                    {trades.map((trade, index) =>
                        <Tab
                            key={index}
                            text={trade.symbol}
                        />
                    )}
                </TabList>
                <BaseTradeCard
                    index={activeTradeIndex}
                    actions={actions}
                    trade={activeTrade}
                    tick={ticks[activeTrade.symbol]}
                    contract={contracts[activeTrade.symbol]}
                    isActive
                    {...this.props}
                />
            </div>
        );
    }
}
