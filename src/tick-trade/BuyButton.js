import React, { PropTypes } from 'react';
import M from '../_common/M';
import NumberPlain from '../_common/NumberPlain';

export default class BuyButton extends React.Component {

    static propTypes = {
        id: PropTypes.string,
        currency: PropTypes.string.isRequired,
        askPrice: PropTypes.number,
        payout: PropTypes.number,
        disabled: PropTypes.bool,
        onClick: PropTypes.func.isRequired,
    };

    render() {
        const { id, currency, askPrice, disabled, payout, onClick } = this.props;

        return (
            <button
                id={id}
                className="buy-btn"
                onClick={onClick}
                disabled={disabled || !askPrice}
            >
                <M m="Purchase for " />
                <NumberPlain
                    currency={currency}
                    value={askPrice}
                />&nbsp;
                {payout && (
                    <NumberPlain
                        currency={currency}
                        value={payout}
                    />
                )}
            </button>
        );
    }
}
