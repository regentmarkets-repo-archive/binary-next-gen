import React, { PropTypes, Component } from 'react';

export default class NewTradeButton extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        symbol: PropTypes.string.isRequired,
        noOfTrades: PropTypes.number.isRequired,
    };

    render() {
        const { actions, symbol, noOfTrades } = this.props;

        return (
            <button
                id="new-trade-btn"
                className="btn-secondary"
                onClick={() => {
                    actions.createTrade(symbol);
                    actions.changeActiveTrade(noOfTrades);
                }}
            >
                New Trade
            </button>
        );
    }
}
