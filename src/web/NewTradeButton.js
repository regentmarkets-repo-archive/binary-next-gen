import React, { PropTypes, Component } from 'react';

export default class NewTradeButton extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        symbol: PropTypes.string,
    };

    render() {
        const { actions, symbol } = this.props;

        return (
            <button
                id="new-trade-btn"
                className="btn-secondary"
                onClick={() => actions.createTrade(symbol)}
            >
                New Trade
            </button>
        );
    }
}
