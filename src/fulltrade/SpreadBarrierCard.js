import React, { PropTypes, Component } from 'react';
import { RadioGroup, InputGroup } from '../_common';

export default class SpreadBarrierCard extends Component {
    static propTypes = {
        amountPerPoint: PropTypes.number,
        amountPerPointChange: PropTypes.func,
        currency: PropTypes.string,
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
            amountPerPointChange,
            currency,
            stopProfitChange,
            stopLossChange,
            stopTypeChange,
            spreadInfo,
            stopType,
            } = this.props;

        const stopTypeOptions = [{ text: 'Points', value: 'point' }, { text: currency, value: 'dollar' }];
        return (
            spreadInfo ?
                <div>
                    <InputGroup
                        type="number"
                        label={`Amount per point (${currency})`}
                        defaultValue={spreadInfo.amountPerPoint}
                        onChange={amountPerPointChange}
                    />
                    <RadioGroup
                        name="spread-param"
                        options={stopTypeOptions}
                        value={stopType || spreadInfo.stopType}
                        onChange={stopTypeChange}
                    />
                    <InputGroup
                        type="number"
                        label="Stop loss"
                        defaultValue={spreadInfo.stopLoss}
                        onChange={stopLossChange}
                    />
                    <InputGroup
                        type="number"
                        label="Stop profit"
                        defaultValue={spreadInfo.stopProfit}
                        onChange={stopProfitChange}
                    />
                </div> :
                <div/>
        );
    }
}
