import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import RadioGroup from '../_common/RadioGroup';
import InputGroup from '../_common/InputGroup';

export default class SpreadBarrierCard extends Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    static propTypes = {
        amountPerPoint: PropTypes.number,
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
            amountPerPointChange,
            currency,
            index,
            stopProfitChange,
            stopLossChange,
            stopTypeChange,
            spreadInfo,
            stopType,
            } = this.props;

        const stopTypeOptions = [{ text: 'Points', value: 'point' }, { text: currency, value: 'dollar' }];

        if (!spreadInfo) return null;

        return (
            <div>
                <InputGroup
                    type="number"
                    label={`Amount per point (${currency})`}
                    defaultValue={spreadInfo.amountPerPoint}
                    onChange={amountPerPointChange}
                />
                <RadioGroup
                    name={'spread-param' + index}
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
            </div>
        );
    }
}
