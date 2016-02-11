import React, { PropTypes, Component } from 'react';
import RadioGroup from '../../_common/RadioGroup';
import InputGroup from '../../_common/InputGroup';

import CollapsibleFormSnippet from '../../containers/CollapsibleFormSnippet';
import shouldPureComponentUpdate from 'react-pure-render/function';

export default class SpreadBarrierCard extends Component {
    static propTypes = {
        amountPerPoint: PropTypes.number,
        amountPerPointChange: PropTypes.func,
        currency: PropTypes.string,
        id: PropTypes.string,
        stopLoss: PropTypes.number,
        stopLossChange: PropTypes.func,
        stopProfit: PropTypes.number,
        stopProfitChange: PropTypes.func,
        stopType: PropTypes.string,
        stopTypeChange: PropTypes.func,
        spreadInfo: PropTypes.object,
    };

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        const {
            amountPerPointChange,
            currency,
            id,
            stopProfitChange,
            stopLossChange,
            stopTypeChange,
            spreadInfo,
            stopType,
            } = this.props;

        const stopTypeOptions = [{ text: 'Points', value: 'point' }, { text: currency, value: 'dollar' }];
        return (
            spreadInfo ?
                <CollapsibleFormSnippet label="Spreads">
                    <InputGroup
                        type="number"
                        label={`Amount per point (${currency})`}
                        defaultValue={spreadInfo.amountPerPoint}
                        onChange={amountPerPointChange}
                    />
                    <RadioGroup
                        name={'spread-param' + id}
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
                </CollapsibleFormSnippet> :
                <div/>
        );
    }
}
