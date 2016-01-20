import React, { Component, PropTypes } from 'react';
import { InputGroup, SelectGroup, ErrorMsg } from '../_common';
import { durationText } from '../_utils/TradeUtils';

export default class DurationCard extends Component {
    static propTypes = {
        duration: PropTypes.number,
        durationUnit: PropTypes.string,
        options: PropTypes.array,
        onUnitChange: PropTypes.func,
        onDurationChange: PropTypes.func,
    };

    render() {
        const { duration, durationUnit, options, onUnitChange, onDurationChange } = this.props;
        const unitOptions = options.map(opt => ({ value: opt.unit, text: durationText(opt.unit) }));
        const currentUnitBlock = options.find(opt => opt.unit === durationUnit);
        const min = currentUnitBlock && currentUnitBlock.min;
        const max = currentUnitBlock && currentUnitBlock.max;
        const showError = duration > max || duration < min;
        const errorMsg = duration > max ? `Maximum is ${max}` : `Minimum is ${min}`;
        return (
            currentUnitBlock ?
                <div>
                    <div className="row">
                        <InputGroup
                            type="number"
                            value={duration}
                            min={min}
                            max={max}
                            onChange={onDurationChange}
                        />
                        <SelectGroup
                            options={unitOptions}
                            value={durationUnit}
                            onChange={onUnitChange}
                        />
                    </div>
                    <ErrorMsg shown={showError} text={errorMsg} />
                </div> :
                <div/>
        );
    }
}
