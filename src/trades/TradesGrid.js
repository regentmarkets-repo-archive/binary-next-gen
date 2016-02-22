import React, { PropTypes, Component } from 'react';
import GenericTradeCard from '../fulltrade/FullTradeCard';

export default class TradesGrid extends Component {

    static propTypes = {
        actions: PropTypes.object.isRequired,
        ticks: PropTypes.array.isRequired,
        trades: PropTypes.array.isRequired,
        contracts: PropTypes.object.isRequired,
    };

    render() {
        const { actions, trades, ticks, contracts } = this.props;

        return (
            <div className="trades-grid">
                {trades.map((trade, index) =>
                    (contracts[trade.symbol] && <GenericTradeCard
                        key={index}
                        index={index}
                        actions={actions}
                        trade={trade}
                        tick={ticks[trade.symbol]}
                        contract={contracts[trade.symbol]}
                        {...this.props}
                    />)
                )}
            </div>
        );
    }
}
