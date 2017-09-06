import React, { PureComponent } from 'react';
import debounce from 'lodash.debounce';
import { NumericInput, Label } from 'binary-components';
import { actions } from '../_store';

const payouts = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000];
const debounceStakeChange = debounce(actions.reqStakeChange, 400);

export default class StakeCard extends PureComponent {

    props: {
        amount: number,
        isVirtual: boolean,
        index: number,
        fractionalDigits: number,
    };
    onAmountChange = value => {
        const { index } = this.props;
        debounceStakeChange(index, value);
    }

    render() {
        const { amount, isVirtual, fractionalDigits } = this.props;
        const max = isVirtual ? 10000 : 500;                // TODO: temp restriction
        return (
            <div className="param-row payout-picker">
                <Label text="Stake" />
                <NumericInput
                    className="numeric-input param-field"
                    defaultValue={amount}
                    min={0}
                    max={max}
                    decimal={fractionalDigits}
                    valueList={payouts}
                    onChange={this.onAmountChange}
                />
            </div>
        );
    }
}
