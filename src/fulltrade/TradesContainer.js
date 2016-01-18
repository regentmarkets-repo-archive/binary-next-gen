import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { fullTradesSelector } from './selectors';
import TradePanel from './TradePanel';

@connect(fullTradesSelector)
export default class TradesContainer extends React.Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        assets: PropTypes.array.isRequired,
        contracts: PropTypes.object.isRequired,
        currency: PropTypes.string.isRequired,
        trades: PropTypes.object.isRequired,
        ticks: PropTypes.object.isRequired,
    };
    createTrade() {
        const { trades, actions } = this.props;
        const maxID = Object.keys(trades).reduce((a, b) => Math.max(a, b));
        actions.initTrade(maxID);
    }

    render() {
        const { assets, trades, contracts, actions, ticks, currency } = this.props;
        const allID = Object.keys(trades);
        return (
            <div>
                {allID.map(id => {
                    const symbol = trades[id].symbol;
                    const contract = contracts[symbol];
                    const tick = ticks[symbol];
                    if (contract) {
                        return (
                            <TradePanel
                                actions={actions}
                                assets={assets}
                                currency={currency}
                                key={id}
                                id={id}
                                trade={trades[id]}
                                contract={contract}
                                tick={tick}
                            />
                        );
                    }
                })}
                <button onClick={::this.createTrade}>Create Trade Board</button>
            </div>
        );
    }
}
