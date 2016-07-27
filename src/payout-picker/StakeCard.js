import React, { PropTypes, PureComponent } from 'react';
import debounce from 'lodash.debounce';
import { NumericInput, Label } from 'binary-components';
import { isMobile } from 'binary-utils';
import { actions } from '../_store';
import { changeAmount } from '../trade-params/TradeParamsCascadingUpdates';

const payouts = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000];

export default class StakeCard extends PureComponent {

    static propTypes = {
        amount: PropTypes.number.isRequired,
        isVirtual: PropTypes.bool.isRequired,
        index: PropTypes.number.isRequired,
    };

    onAmountChange = e => {
        const { index } = this.props;
        actions.reqStakeChange(index, e);
    }

    render() {
        const { amount, isVirtual } = this.props;
        const min = isVirtual ? 0 : 500; // TODO: temporary, remove soon

        return (
            <div className="param-row payout-picker">
                <Label text="Stake" />
                <NumericInput
                    className="numeric-input param-field"
                    value={amount}
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
