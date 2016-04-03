import React, { PropTypes, Component } from 'react';
import Button from '../_common/Button';

export default class BuyButton extends Component {

    static propTypes = {
        id: PropTypes.string,
        currency: PropTypes.string,
        askPrice: PropTypes.number,
        payout: PropTypes.number,
        disabled: PropTypes.bool,
        onClick: PropTypes.func,
    };

    render() {
        const { id, askPrice, disabled, onClick } = this.props;

        return (
            <Button
                id={id}
                className="buy-btn"
                onClick={onClick}
                disabled={disabled || !askPrice}
                text="Purchase"
            />
        );
    }
}
