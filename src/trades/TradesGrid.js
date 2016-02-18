import React, { PropTypes, Component } from 'react';
import FullTradeCard from '../fulltrade/FullTradeCard';

export default class TradesGrid extends Component {

    static propTypes = {
        actions: PropTypes.object.isRequired,
        trades: PropTypes.array.isRequired,
    };

    render() {
        const { actions, trades } = this.props;

        return (
            <div className="trades-grid">
                {trades.map((trade, index) =>
                    <FullTradeCard
                        key={index}
                        index={index}
                        actions={actions}
                        {...trade}
                    />
                )}
            </div>
        );
    }
}
