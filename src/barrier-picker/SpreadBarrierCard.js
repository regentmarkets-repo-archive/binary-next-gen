import React, { PropTypes, PureComponent } from 'react';
import { RadioGroup, InputGroup, Error } from 'binary-components';
import { noOfDecimals } from 'binary-utils';
import changeAmountPerPoint from '../trade-params/updates/changeAmountPerPoint';

export default class SpreadBarrierCard extends PureComponent {

    static propTypes = {
        amountPerPoint: PropTypes.string,
        currency: PropTypes.string,
        index: PropTypes.number,
        stopLoss: PropTypes.number,
        stopProfit: PropTypes.number,
        stopType: PropTypes.string,
        spreadInfo: PropTypes.object,
        onUpdateTradeParams: PropTypes.func,
    };

    onStopTypeChange = e => {
        this.updateTradeParams({ stopType: e.target.value });
    }

    onStopLossChange = e => {
        this.updateTradeParams({ stopLoss: e.target.value });
    }

    onStopProfitChange = e => {
        this.updateTradeParams({ stopProfit: e.target.value });
    }
    onAmountPerPointChange = e => {
        const { onUpdateTradeParams } = this.props;
        const inputValue = e.target.value;
        const updatedAmountPerPoint = changeAmountPerPoint(inputValue);
        onUpdateTradeParams(updatedAmountPerPoint);
    }
    render() {
        const {
            amountPerPoint,
            currency,
            index,
            stopProfit,
            stopLoss,
            spreadInfo,
            stopType,
            } = this.props;

        const stopTypeOptions = [{ text: 'Points', value: 'point' }, { text: currency, value: 'dollar' }];
        const decimals = noOfDecimals(amountPerPoint);

        if (!spreadInfo) return null;

        return (
            <div>
                <InputGroup
                    type="number"
                    label={`Amount per point (${currency})`}
                    value={amountPerPoint}
                    onChange={this.onAmountPerPointChange}
                    step="0.01"
                />
                <Error
                    shown={decimals > 2}
                    text="Too many decimals, maximum 2 decimals allowed."
                />
                <RadioGroup
                    name={'spread-param' + index}
                    options={stopTypeOptions}
                    value={stopType}
                    onChange={this.onStopTypeChange}
                />
                <InputGroup
                    type="number"
                    label="Stop loss"
                    value={stopLoss}      // TODO: hardcode default as backend return wrong data
                    onChange={this.onStopLossChange}
                />
                <InputGroup
                    type="number"
                    label="Stop profit"
                    value={stopProfit}
                    onChange={this.onStopProfitChange}
                />
            </div>
        );
    }
}
