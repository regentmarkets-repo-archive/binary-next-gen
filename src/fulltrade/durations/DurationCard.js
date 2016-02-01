import React, { Component, PropTypes } from 'react';
import { CollapsibleFormSnippet, InputGroup, SelectGroup, ErrorMsg } from '../../_common';
import ForwardStartingOptions from './ForwardStartingOptions';
import { durationText } from '../../_utils/TradeUtils';

export default class DurationCard extends Component {
    static propTypes = {
        dateStart: PropTypes.number,
        duration: PropTypes.number,
        durationUnit: PropTypes.string,
        forwardStartingDuration: PropTypes.object,       // treated as special case
        options: PropTypes.array,
        onUnitChange: PropTypes.func,
        onDurationChange: PropTypes.func,
        onStartDateChange: PropTypes.func,
    };

    render() {
        const {
            dateStart,
            duration,
            durationUnit,
            forwardStartingDuration,
            options,
            onUnitChange,
            onDurationChange,
            onStartDateChange,
            } = this.props;

        const optionsToUse = dateStart && forwardStartingDuration ? forwardStartingDuration.options : options;
        const unitOptions = optionsToUse.map(opt => ({ value: opt.unit, text: durationText(opt.unit) }));
        const currentUnitBlock = optionsToUse.find(opt => opt.unit === durationUnit);

        const min = currentUnitBlock && currentUnitBlock.min;
        const max = currentUnitBlock && currentUnitBlock.max;

        const showError = duration > max || duration < min;
        const errorMsg = (duration > max ? `Maximum is ${max} ` : `Minimum is ${min} `) + durationText(durationUnit);
        return (
            <div>
                {forwardStartingDuration &&
                    <ForwardStartingOptions
                        dateStart={dateStart}
                        ranges={forwardStartingDuration.range}
                        onStartDateChange={onStartDateChange}
                    />
                }
                {currentUnitBlock ?
                    <CollapsibleFormSnippet label="Durations">
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
                    </CollapsibleFormSnippet> :
                    <div/>}
            </div>
        );
    }
}
