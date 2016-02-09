import React, { PropTypes, Component } from 'react';
import { InputGroup, CollapsibleFormSnippet } from '../_common';
import RadioGroup from './workaround/CustomRadioGroup';
import shouldPureComponentUpdate from 'react-pure-render/function';

const basises = ['payout', 'stake'];
const payouts = [5, 10, 50, 100, 500, 1000];
export default class PayoutCard extends Component {
    static propTypes = {
        amount: PropTypes.number.isRequired,
        basis: PropTypes.oneOf(basises).isRequired,
        currency: PropTypes.string.isRequired,
        id: PropTypes.string,
        onAmountChange: PropTypes.func.isRequired,     // both functions take the updated value instead of event object
        onBasisChange: PropTypes.func.isRequired,
    };

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        const { onBasisChange, basis, id, amount, currency, onAmountChange } = this.props;
        const basisOptions = basises.map(i => ({ text: i, value: i }));
        const payoutOptions = payouts.map(i => ({ text: i, value: i }));
        return (
            <CollapsibleFormSnippet label="Payout/Stake">
                <RadioGroup
                    className="radio-selector"
                    name={'basis' + id}
                    options={basisOptions}
                    onChange={onBasisChange}
                    value={basis}
                />
                <InputGroup
                    type="number"
                    defaultValue={amount}
                    min={0}
                    step={0.01}
                    label={currency.toUpperCase()}
                    onChange={onAmountChange}
                />
                <RadioGroup
                    className="radio-selector"
                    name={'payouts' + id}
                    options={payoutOptions}
                    onChange={onAmountChange}
                    value={amount}
                />
            </CollapsibleFormSnippet>
        );
    }
}
