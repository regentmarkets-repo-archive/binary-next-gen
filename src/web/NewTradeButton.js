import React, { PropTypes, Component } from 'react';
import Button from '../_common/Button';

export default class NewTradeButton extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        symbol: PropTypes.string.isRequired,
    };

    render() {
        const { actions, symbol } = this.props;

        return (
            <Button
                id="new-trade-btn"
                text="New Trade"
                className="btn-secondary"
                onClick={() => {
                    actions.createTrade(symbol);
                }}
            />
        );
    }
}
