import React, { PropTypes, Component } from 'react';
import Button from '../_common/Button';

export default class BuyButton extends Component {

    static propTypes = {
        id: PropTypes.string,
        currency: PropTypes.string,
        askPrice: PropTypes.number,
        longcode: PropTypes.string,
        disabled: PropTypes.bool,
        onClick: PropTypes.func,
    };

    render() {
        const { id, askPrice, disabled, longcode, onClick } = this.props;

        return (
            <div>
                <Button
                    id={id}
                    className="buy-btn"
                    onClick={onClick}
                    disabled={disabled || !askPrice}
                    text="Purchase"
                />
                {longcode && <div className="tooltip">{longcode}</div>}
            </div>
        );
    }
}
