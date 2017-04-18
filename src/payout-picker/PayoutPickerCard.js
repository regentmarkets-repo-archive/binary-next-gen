import React, { PureComponent } from 'react';
import { RadioGroup, InputGroup } from 'binary-components';
import { actions } from '../_store';

const basisTypes = [
    { value: 'payout', text: 'Payout' },
    { value: 'stake', text: 'Stake' },
];

const payoutAmounts = [1, 2, 5, 10, 20, 50, 100, 500, 1000].map(x => ({
    value: x,
    text: x,
}));
const maxAmount = 100000;
const minAmount = 1;

export default class PayoutPickerCard extends PureComponent {
    props: {
        location: object,
        params: object,
        trades: any[],
    };

    onBasisChange = (e: SyntheticEvent) =>
        this.updateValue('basis', e.target.value);

    onAmountChange = (e: SyntheticEvent) =>
        this.updateValue('amount', e.target.value);

    updateValue(name, value) {
        const { id } = this.props.params;

        if (name === 'amount') {
            let amount = +value;
            if (amount > maxAmount) {
                amount = maxAmount;
            } else if (amount < minAmount) {
                amount = minAmount;
            }

            actions.updateTradeParams(id, name, amount);
        } else {
            actions.updateTradeParams(id, name, value);
        }
    }

    render() {
        const { trades } = this.props;
        const { id } = this.props.params;
        const { query } = this.props.location;
        const currency = query.currency;
        const trade = trades[id];

        return (
            <div id="payout-picker">
                <RadioGroup
                    name="basis"
                    options={basisTypes}
                    value={trade.basis}
                    onChange={this.onBasisChange}
                    {...this.props}
                />
                <InputGroup
                    type="number"
                    label={currency}
                    min={minAmount}
                    max={maxAmount}
                    value={trade.amount}
                    onChange={this.onAmountChange}
                />
                <RadioGroup
                    name="amount"
                    value={trade.amount}
                    options={payoutAmounts}
                    onChange={this.onAmountChange}
                    {...this.props}
                />
            </div>
        );
    }
}
