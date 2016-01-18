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
            stopType,
            stopTypeChange,
            spreadInfo,
            } = this.props;

        const stopTypeOptions = [{ text: 'Points', value: 'point' }, { text: currency, value: 'dollar' }];
        return (
            spreadInfo ?
                <div>
                    <InputGroup
                        type="number"
                        label={`Amount per point (${currency})`}
                        defaultValue={spreadInfo.amount_per_point}
                        onChange={amountPerPointChange}
                    />
                    <RadioGroup
                        name="spread-param"
                        options={stopTypeOptions}
                        value={stopType}
                        onChange={stopTypeChange}
                    />
                    <InputGroup
                        type="number"
                        label="Stop loss"
                        defaultValue={spreadInfo.stop_loss}
                        onChange={stopLossChange}
                    />
                    <InputGroup
                        type="number"
                        label="Stop profit"
                        defaultValue={spreadInfo.stop_profit}
                        onChange={stopProfitChange}
                    />
                </div> :
                <div/>
        );
    }
}
