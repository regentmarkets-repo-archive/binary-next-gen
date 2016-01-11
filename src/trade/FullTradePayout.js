import React, { PropTypes, Component } from 'react';
import { RadioGroup, InputGroup } from '../_common';

const basises = ['payout', 'stake'];
const payouts = [5, 10, 50, 100, 500, 1000];
export default class FullTradePayout extends Component {
    static propTypes = {
        basis: PropTypes.oneOf(basises),
        amount: PropTypes.number,
        max: PropTypes.number,
        min: PropTypes.number,
        currency: PropTypes.string.isRequired,
        onAmountChange: PropTypes.func,     // both functions take the updated value instead of event object
        onBasisChange: PropTypes.func,
    };

    guardedAmountUpdate(e) {
        const val = parseFloat(e.target.value);
        const { min, max, onAmountChange } = this.props;
        if (val > max) {
            onAmountChange(max);
        } else if (val < min) {
            onAmountChange(min);
        } else {
            onAmountChange(val);
        }
    }

    setMinMax(e) {
        const val = e.target.value;
        const { onAmountChange, min, max } = this.props;
        if (val === 'min') {
            onAmountChange(min);
        } else if (val === 'max') {
            onAmountChange(max);
        }
    }

    render() {
        const { onBasisChange, basis, amount, min, max, currency } = this.props;
        const basisOptions = basises.map(i => ({ text: i, value: i }));
        const payoutOptions = payouts.map(i => ({ text: i, value: i }));
        return (
            <div>
                <RadioGroup
                    className="radio-selector"
                    name="basis"
                    options={basisOptions}
                    onChange={onBasisChange}
                    value={basis}
                />
                <InputGroup
                    type="number"
                    value={amount}
                    label={currency.toUpperCase()}
                    onChange={::this.guardedAmountUpdate}
                    min={min}
                    max={max}
                />
                <RadioGroup
                    className="radio-selector"
                    options={[{ text: 'min', value: 'min' }, { text: 'max', value: 'max' }]}
                    onChange={::this.setMinMax}
                />
                <RadioGroup
                    className="radio-selector"
                    options={payoutOptions}
                    onChange={::this.guardedAmountUpdate}
                    value={amount}
                />
            </div>
        );
    }
}
