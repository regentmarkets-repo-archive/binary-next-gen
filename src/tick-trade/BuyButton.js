import React, { PropTypes, Component } from 'react';
import M from '../_common/M';

export default class BuyButton extends Component {

    static propTypes = {
        id: PropTypes.string,
        currency: PropTypes.string.isRequired,
        askPrice: PropTypes.number,
        payout: PropTypes.number,
        disabled: PropTypes.bool,
        onClick: PropTypes.func.isRequired,
    };

    render() {
        const { id, askPrice, disabled, onClick } = this.props;

        return (
            <button
                id={id}
                className="buy-btn"
                onClick={onClick}
                disabled={disabled || !askPrice}
            >
                <M m="Purchase" />
            </button>
        );
    }
}
