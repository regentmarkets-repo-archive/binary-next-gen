import React, { PureComponent } from 'react';
import { RadioGroup, InputGroup, ErrorMsg } from 'binary-components';
import { noOfDecimals } from 'binary-utils';
import changeAmountPerPoint from '../trade-params/updates/changeAmountPerPoint';

export default class SpreadBarrierCard extends PureComponent {
    props: {
        amountPerPoint: string,
        currency: string,
        index: number,
        stopLoss: number,
        stopProfit: number,
        stopType: string,
        spreadInfo: object,
        onUpdateTradeParams: (amountPerPoint: object) => void,
    };

    onStopTypeChange = (e: SyntheticEvent) =>
        this.updateTradeParams({ stopType: e.target.value });

    onStopLossChange = (e: SyntheticEvent) =>
        this.updateTradeParams({ stopLoss: e.target.value });

    onStopProfitChange = (e: SyntheticEvent) =>
        this.updateTradeParams({ stopProfit: e.target.value });

    onAmountPerPointChange = (e: SyntheticEvent) => {
        const { onUpdateTradeParams } = this.props;
        const inputValue = e.target.value;
        const updatedAmountPerPoint = changeAmountPerPoint(inputValue);
        onUpdateTradeParams(updatedAmountPerPoint);
    };

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

        const stopTypeOptions = [
            { text: 'Points', value: 'point' },
            { text: currency, value: 'dollar' },
        ];
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
                <ErrorMsg
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
                    value={stopLoss} // TODO: hardcode default as backend return wrong data
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
