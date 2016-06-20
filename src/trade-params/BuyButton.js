import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import Button from 'binary-components/lib/Button';

export default class BuyButton extends Component {

    static propTypes = {
        id: PropTypes.string,
        currency: PropTypes.string,
        askPrice: PropTypes.number,
        longcode: PropTypes.string,
        disabled: PropTypes.bool,
        onClick: PropTypes.func,
    };

    shouldComponentUpdate = shouldPureComponentUpdate;

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
