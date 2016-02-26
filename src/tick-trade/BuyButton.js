import React, { PropTypes, Component } from 'react';
import M from '../_common/M';
import NumberPlain from '../_common/NumberPlain';

export default class BuyButton extends Component {

    static propTypes = {
        id: PropTypes.string,
        currency: PropTypes.string.isRequired,
        askPrice: PropTypes.number,
        payout: PropTypes.number,
        disabled: PropTypes.bool,
        onClick: PropTypes.func.isRequired,
        isAuthorized: PropTypes.bool.isRequired,
    };

    render() {
        const { id, currency, askPrice, disabled, payout, onClick, isAuthorized } = this.props;

        return (
            <button
                id={id}
                className="buy-btn"
                onClick={onClick}
                disabled={disabled || !askPrice || (!isAuthorized)}
            >
                <M m="Purchase for " />
                {askPrice &&
                    <NumberPlain
                        currency={currency}
                        value={askPrice}
                    />
                }
                &nbsp;
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
