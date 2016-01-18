import React, { PropTypes, Component } from 'react';
import { RadioGroup, InputGroup } from '../_common';

const basises = ['payout', 'stake'];
const payouts = [5, 10, 50, 100, 500, 1000];
export default class PayoutCard extends Component {
    static propTypes = {
        basis: PropTypes.oneOf(basises).isRequired,
        amount: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
        onAmountChange: PropTypes.func.isRequired,     // both functions take the updated value instead of event object
        onBasisChange: PropTypes.func.isRequired,
    };

    render() {
        const { onBasisChange, basis, amount, currency, onAmountChange } = this.props;
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
                    onChange={onAmountChange}
                />
                <RadioGroup
                    className="radio-selector"
                    name="payouts"
                    options={payoutOptions}
                    onChange={onAmountChange}
                    value={amount}
                />
            </div>
        );
    }
}
