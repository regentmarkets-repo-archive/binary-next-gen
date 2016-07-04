import React, { PropTypes, Component } from 'react';
import Button from 'binary-components/lib/Button';
import { actions } from '../_store';

export default class NewTradeButton extends Component {

    static propTypes = {
        symbol: PropTypes.string.isRequired,
    };

    onNewTradeClick = () => {
        const { symbol } = this.props;
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
