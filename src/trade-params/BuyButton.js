import React, { PureComponent } from 'react';
import { Button } from 'binary-components';

type Props = {
    id: string,
    askPrice: number,
    longcode: string,
    disabled: boolean,
    onClick: (e: SyntheticEvent) => void,
}

export default class BuyButton extends PureComponent {

    props: Props;

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
