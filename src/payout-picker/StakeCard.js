import React, { PropTypes, PureComponent } from 'react';
import Label from 'binary-components/lib/Label';
import NumericInput from 'binary-components/lib/NumericInput';
import { changeAmount } from '../trade-params/TradeParamsCascadingUpdates';
const payouts = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000];
import debounce from 'lodash.debounce';
import isMobile from 'binary-utils/lib/isMobile';

export default class StakeCard extends PureComponent {

    static propTypes = {
        amount: PropTypes.number.isRequired,
        isVirtual: PropTypes.bool.isRequired,
        actions: PropTypes.object.isRequired,
        onUpdateTradeParams: PropTypes.func,
    };
    debouncedUpdateAmount = debounce(e => {
        const inputValue = e.target.value;
        const { index, actions, onUpdateTradeParams } = this.props;
        if (inputValue > 500) {                  // TODO: temporary to control stake amount
            actions.updateTradeError(index, 'stakeError', 'Stake cannot be more than 500');
            return;
        }
        actions.updateTradeError(index, 'stakeError', undefined);
        const updatedAmount = changeAmount(inputValue);
        onUpdateTradeParams(updatedAmount);
    }, isMobile ? 300 : 150, { leading: true, trailing: true })

    onAmountChange = e => {
        const { actions } = this.props;
        actions.updateTradeUIState(this.props.index, 'disabled', true);
        this.debouncedUpdateAmount(e);
    }
    onBasisChange = e => {
        const { onUpdateTradeParams } = this.props;
        onUpdateTradeParams({ basis: e.target.value });
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
                    valueList={payouts}
                    onChange={this.onAmountChange}
                />
            </div>
        );
    }
}
