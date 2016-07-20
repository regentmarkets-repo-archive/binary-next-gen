import React, { PropTypes, Component } from 'react';
import Label from 'binary-components/lib/Label';
import NumericInput from 'binary-components/lib/NumericInput';

const payouts = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000];

export default class StakeCard extends Component {

    static propTypes = {
        amount: PropTypes.number.isRequired,
        isVirtual: PropTypes.bool.isRequired,
        onAmountChange: PropTypes.func.isRequired,
    };

    render() {
        const { amount, isVirtual, onAmountChange } = this.props;
        const min = isVirtual ? 0 : 500; // TODO: temporary, remove soon

        return (
            <div className="param-row payout-picker">
                <Label text="Stake" />
                <NumericInput
                    className="numeric-input param-field"
                    value={amount}
                    min={min}
                    max={100000}
                    valueList={payouts}
                    onChange={onAmountChange}
                />
            </div>
        );
    }
}
