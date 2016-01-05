import React, { Component, PropTypes } from 'react';
import NoBarrierTrade from './NoBarrierTrade';

const showTrade = (t, actions, params, currency, proposal, receipt, failure) => {
    switch (t.barriers) {
        case 0: return (
            <NoBarrierTrade
                tradeInfo={t}
                actions={actions}
                params={params && params.toJS()}
                currency={currency}
                proposal={proposal}
                receipt={receipt}
                failure={failure}
            />
        );
        default: return <div></div>;
    }
};

export default class QuickTradeList extends Component {
    static propTypes = {
        trades: PropTypes.array.isRequired,
        actions: PropTypes.object.isRequired,
        quickTrade: PropTypes.object.isRequired,
        currency: PropTypes.string.isRequired,
        proposals: PropTypes.object.isRequired,
    };

    // onTradeSelect(e){
    //    // TODO: should close other trades
    //    this.props.getPriceProposal()
    // }

    render() {
        const { trades, actions, quickTrade, currency, proposals } = this.props;
        return (
            <table>
                <thead>
                    <tr>
                        <th>Available Trades</th>
                    </tr>
                </thead>
                <tbody>
                    {trades.map((t, idx) => (
                            <tr key={idx}>
                                <td>
                                    {showTrade(
                                        t,
                                        actions,
                                        quickTrade.getIn([t.underlying_symbol, t.contract_type, 'params']),
                                        currency,
                                        proposals.getIn([t.underlying_symbol, t.contract_type]),
                                        quickTrade.getIn([t.underlying_symbol, t.contract_type, 'receipt']),
                                        quickTrade.getIn([t.underlying_symbol, t.contract_type, 'failure'])
                                    )}
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        );
    }
}
