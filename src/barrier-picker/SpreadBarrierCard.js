import React, { PropTypes, Component } from 'react';
import RadioGroup from 'binary-components/lib/RadioGroup';
import InputGroup from 'binary-components/lib/InputGroup';
import ErrorMsg from 'binary-components/lib/ErrorMsg';
import noOfDecimals from 'binary-utils/lib/noOfDecimals';

export default class SpreadBarrierCard extends Component {

    static propTypes = {
        amountPerPoint: PropTypes.string,
        amountPerPointChange: PropTypes.func,
        currency: PropTypes.string,
        index: PropTypes.number,
        stopLoss: PropTypes.number,
        stopLossChange: PropTypes.func,
        stopProfit: PropTypes.number,
        stopProfitChange: PropTypes.func,
        stopType: PropTypes.string,
        stopTypeChange: PropTypes.func,
        spreadInfo: PropTypes.object,
    };

    render() {
        const {
            amountPerPoint,
            amountPerPointChange,
            currency,
            index,
            stopProfit,
            stopProfitChange,
            stopLoss,
            stopLossChange,
            stopTypeChange,
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
                    onChange={amountPerPointChange}
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
                    onChange={stopTypeChange}
                />
                <InputGroup
                    type="number"
                    label="Stop loss"
                    value={stopLoss}      // TODO: hardcode default as backend return wrong data
                    onChange={stopLossChange}
                />
                <InputGroup
                    type="number"
                    label="Stop profit"
                    value={stopProfit}
                    onChange={stopProfitChange}
                />
            </div>
        );
    }
}
