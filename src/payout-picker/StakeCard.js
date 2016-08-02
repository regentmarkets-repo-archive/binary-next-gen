import React, { PropTypes, PureComponent } from 'react';
import { NumericInput, Label } from 'binary-components';
import { actions } from '../_store';
import debounce from 'lodash.debounce';

const payouts = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000];
const debounceStakeChange = debounce(actions.reqStakeChange, 400);

export default class StakeCard extends PureComponent {

    static propTypes = {
        amount: PropTypes.number.isRequired,
        isVirtual: PropTypes.bool.isRequired,
        index: PropTypes.number.isRequired,
    };
    onAmountChange = e => {
        const { index } = this.props;
        debounceStakeChange(index, e.target.value);
    }

    render() {
        const { amount, isVirtual } = this.props;
        const min = isVirtual ? 0 : 500; // TODO: temporary, remove soon

        return (
            <div className="param-row payout-picker">
                <Label text="Stake" />
                <NumericInput
                    className="numeric-input param-field"
                    defaultValue={amount}
                    min={min}
                    max={100000}
                    decimal={2}
                    valueList={payouts}
                    onChange={this.onAmountChange}
                />
            </div>
        );
    }
}
