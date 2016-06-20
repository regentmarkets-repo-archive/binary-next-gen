import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import Label from 'binary-components/lib/Label';
import NumericInput from 'binary-components/lib/NumericInput';

// const basises = ['payout', 'stake'];
const payouts = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000];

export default class StakeCard extends Component {

    static propTypes = {
        amount: PropTypes.number.isRequired,
//        basis: PropTypes.oneOf(basises).isRequired,
        onAmountChange: PropTypes.func.isRequired,     // both functions take the updated value instead of event object
        onBasisChange: PropTypes.func.isRequired,
    };

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        const { amount, onAmountChange } = this.props;

        return (
            <div className="param-row payout-picker">
                {/* <RadioGroup
                    className="radio-selector"
                    name={'basis' + id}
                    options={basisOptions}
                    onChange={basises.map(i => ({ text: i, value: i }))}
                    value={basis}
                /> */}
                <Label text="Stake" />
                <NumericInput
                    className="numeric-input param-field"
                    value={amount}
                    min={0}
                    max={100000}
                    valueList={payouts}
                    onChange={onAmountChange}
                />
            </div>
        );
    }
}
