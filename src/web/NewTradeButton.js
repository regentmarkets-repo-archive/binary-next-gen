import React, { PropTypes, Component } from 'react';
import Button from 'binary-components/lib/Button';

export default class NewTradeButton extends Component {

    static propTypes = {
        actions: PropTypes.object.isRequired,
        symbol: PropTypes.string.isRequired,
    };

    onNewTradeClick = () => {
        const { actions, symbol } = this.props;
        actions.createTrade(symbol);
    }

    render() {
        return (
            <Button
                id="new-trade-btn"
                text="New Trade"
                className="btn-secondary"
                onClick={this.onNewTradeClick}
            />
        );
    }
}
