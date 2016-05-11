import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import ErrorMsg from '../_common/ErrorMsg';
import SelectGroup from '../_common/SelectGroup';
import InputGroup from '../_common/InputGroup';
import Label from '../_common/Label';
import durationText from 'binary-utils/lib/durationText';

export default class DurationCard extends Component {
    static propTypes = {
        dateStart: PropTypes.number,
        duration: PropTypes.number,
        durationUnit: PropTypes.string,
        forwardStartingDuration: PropTypes.object,       // treated as special case
        options: PropTypes.array,
        onUnitChange: PropTypes.func,
        onDurationChange: PropTypes.func,
    };

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        const {
            dateStart,
            duration,
            durationUnit,
            forwardStartingDuration,
            options,
            onUnitChange,
            onDurationChange,
        } = this.props;

        const allowStartLater = !!forwardStartingDuration;
        const onlyStartLater = allowStartLater && !options;
        const forwardOptions = forwardStartingDuration && forwardStartingDuration.options;

        let optionsToUse;

        if (onlyStartLater) {
            optionsToUse = forwardOptions;
        } else if (!allowStartLater) {
            optionsToUse = options;
        } else {
            optionsToUse = !!dateStart ? forwardOptions : options;
        }

        const unitOptions = optionsToUse.map(opt => ({ value: opt.unit, text: durationText(opt.unit) }));
        const currentUnitBlock = optionsToUse.find(opt => opt.unit === durationUnit);

        const min = currentUnitBlock && currentUnitBlock.min;
        const max = currentUnitBlock && currentUnitBlock.max;

        const showError = duration > max || duration < min;
        const errorMsg = (duration > max ? `Maximum is ${max} ` : `Minimum is ${min} `) + durationText(durationUnit);
        return (
            <div className="duration-picker">
                {currentUnitBlock ?
                    <div id="duration-fields">
                        <Label text="Duration" />
                        <div className="duration-input">
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
                    </div> :
                    <div />
                }
                <ErrorMsg shown={showError} text={errorMsg} />
            </div>
        );
    }
}
