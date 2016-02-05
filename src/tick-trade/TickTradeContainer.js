import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { immutableChildrenToJS } from '../_utils/ObjectUtils';
import TickTradeCard from './TickTradeCard';
import { tickTradesSelector } from '../_selectors/TickTradeSelector';

@connect(tickTradesSelector)
export default class TickTradeContainer extends Component {

    static propTypes = {
        actions: PropTypes.object.isRequired,
        assets: PropTypes.array.isRequired,
        currency: PropTypes.string.isRequired,
        trades: PropTypes.object.isRequired,
        ticks: PropTypes.object.isRequired,
    };

    componentWillMount() {
        this.props.actions.initTrade('tick');
    }

    render() {
        const { actions, assets, currency, trades, ticks } = immutableChildrenToJS(this.props);
        const allTickId = Object.keys(trades).filter(id => id.indexOf('tick') > -1);

        return (
            <div>
                {allTickId.map(id => {
                    const trade = trades[id];
                    const symbol = trade.symbol;
                    const tick = ticks[symbol];
                    return (
                        tick && trade ?
                            <TickTradeCard
                                actions={actions}
                                assets={assets}
                                currency={currency}
                                key={id}
                                id={id}
                                tick={tick}
                                trade={trade}
                            /> :
                            <div key={id} />
                    );
                })}
            </div>
        );
    }
}
