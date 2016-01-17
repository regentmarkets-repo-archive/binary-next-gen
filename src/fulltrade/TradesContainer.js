import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { fullTradesSelector } from './selectors';
import TradePanel from './TradePanel';

@connect(fullTradesSelector)
export default class TradesContainer extends React.Component {
    static propTypes = {
        contracts: PropTypes.object.isRequired,
        trades: PropTypes.object.isRequired,
        assets: PropTypes.array.isRequired,
        actions: PropTypes.object.isRequired,
    };
    createTrade() {
        const { trades, actions } = this.props;
        const maxID = Object.keys(trades).reduce((a, b) => Math.max(a, b));
        actions.initTrade(maxID);
    }

    render() {
        const { assets, trades, contracts, actions } = this.props;
        const allID = Object.keys(trades);
        return (
            <div>
                {allID.map(id => {
                    const contract = contracts[trades[id].symbol];
                    if (contract) {
                        return (
                            <TradePanel
                                actions={actions}
                                assets={assets}
                                key={id}
                                id={id}
                                trade={trades[id]}
                                contract={contract}
                            />
                        );
                    }
                })}
                <button onClick={::this.createTrade}>Create Trade Board</button>
            </div>
        );
    }
}
