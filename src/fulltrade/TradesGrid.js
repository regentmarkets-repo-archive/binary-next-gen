import React, { PropTypes } from 'react';
import TradePanel from './TradePanel';

export default class TradesGrid extends React.Component {

    static propTypes = {
        actions: PropTypes.object.isRequired,
        assets: PropTypes.object.isRequired,
        contracts: PropTypes.object.isRequired,
        currency: PropTypes.string.isRequired,
        focusedTradeId: PropTypes.number,
        trades: PropTypes.object.isRequired,
        tradesIds: PropTypes.array.isRequired,
        ticks: PropTypes.object.isRequired,
    };

    createTrade() {
        const { tradesIds, actions } = this.props;

        const maxId = tradesIds.reduce((a, b) => Math.max(a, b), -1);
        actions.initTrade(maxId.toString());
    }

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
                <button className="btn-secondary" onClick={::this.createTrade}>+</button>
            </div>
        );
    }
}
