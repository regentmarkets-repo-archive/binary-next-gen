import React, { PureComponent } from 'react';
import debounce from 'lodash.debounce';
import { NumericInput, Label } from 'binary-components';
import { actions } from '../_store';

const debounceStakeChange = debounce(actions.reqStakeChange, 400);

export default class StakeCard extends PureComponent {

    props: {
        amount: number,
        isVirtual: boolean,
        index: number,
        fractionalDigits: number,
        defaultStake: number,
    };
    onAmountChange = value => {
        const { index } = this.props;
        debounceStakeChange(index, value);
    }

    render() {
        const { amount, fractionalDigits, defaultStake } = this.props;
        let decimals = 2;
        if (fractionalDigits > 2 && defaultStake <= 0.01) {
          decimals = (defaultStake + '').length - 2;
        }
        const step = decimals > 2 ? 10 ** (-decimals) : 0;
        return (
            <div className="param-row payout-picker">
                <Label text="Stake" />
                <NumericInput
                    className="numeric-input param-field"
                    defaultValue={amount}
                    min={0}
                    step={step}
                    decimals={decimals}
                    onChange={this.onAmountChange}
                />
            </div>
        );
    }
}
