import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { fullTradesSelector } from './../_selectors/FullTradeSelectors';
import TradePanel from './TradePanel';

@connect(fullTradesSelector)
export default class TradesContainer extends React.Component {

    static propTypes = {
        actions: PropTypes.object.isRequired,
        assets: PropTypes.object.isRequired,
        contracts: PropTypes.object.isRequired,
        currency: PropTypes.string.isRequired,
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
            <div>
                {tradesIds.map(id => {
                    const symbol = trades[id].symbol;
                    const contract = contracts[symbol];
                    const tick = ticks[symbol];
                    if (contract && tick) {
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
                <button onClick={::this.createTrade}>Create Trade Panel</button>
            </div>
        );
    }
}
