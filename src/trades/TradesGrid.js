import React, { PropTypes } from 'react';
import TradePanel from '../fulltrade/TradePanel';

export default class TradesGrid extends React.Component {

    static propTypes = {
        actions: PropTypes.object.isRequired,
        contracts: PropTypes.object.isRequired,
        trades: PropTypes.object.isRequired,
        tradesIds: PropTypes.array.isRequired,
        ticks: PropTypes.object.isRequired,
    };

    render() {
        const { trades, tradesIds, contracts, ticks } = this.props;

        return (
            <div className="trades-grid">
                {tradesIds.map(id => {
                    const symbol = trades[id].symbol;
                    const contract = contracts[symbol];
                    const tick = ticks[symbol];

                    if (contract) {
                        return (
                            <TradePanel
                                key={id}
                                id={id}
                                contract={contract}
                                tick={tick}
                                trade={trades[id]}
                                {...this.props}
                            />
                        );
                    }
                })}
            </div>
        );
    }
}
