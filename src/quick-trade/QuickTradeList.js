import React, { Component, PropTypes } from 'react';
import NoBarrierTrade from './NoBarrierTrade';

const showTrade = (t, actions, params, currency) => {
    switch (t.barriers) {
        case 0: return <NoBarrierTrade tradeInfo={t} actions={actions} params={params && params.toJS()} currency={currency} />;
        default: return null;
    }
};

export default class QuickTradeList extends Component {
    static propTypes = {
        trades: PropTypes.array.isRequired,
        actions: PropTypes.object.isRequired,
        quickTradeParams: PropTypes.object.isRequired,
        currency: PropTypes.string.isRequired,
    };

    // onTradeSelect(e){
    //    // TODO: should close other trades
    //    this.props.getPriceProposal()
    // }

    render() {
        const { trades, actions, quickTradeParams, currency } = this.props;
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
                                    {showTrade(t, actions, quickTradeParams.getIn([t.underlying_symbol, t.contract_type]), currency)}
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        );
    }
}
