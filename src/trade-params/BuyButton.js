import React, { PropTypes, PureComponent } from 'react';
import { Button } from 'binary-components';

export default class BuyButton extends PureComponent {

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
