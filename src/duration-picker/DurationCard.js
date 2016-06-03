import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
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
        onError: PropTypes.func,
    };

    shouldComponentUpdate = shouldPureComponentUpdate;

    // return error msg or undefined is no error
    validateDuration(duration, durationUnit) {
        const {
            dateStart,
            forwardStartingDuration,
            options,
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
        const currentUnitBlock = optionsToUse.find(opt => opt.unit === durationUnit);
        const min = currentUnitBlock && currentUnitBlock.min;
        const max = currentUnitBlock && currentUnitBlock.max;
        const showError = duration > max || duration < min;
        if (showError) {
            const errorMsg =
                (duration > max ? `Maximum is ${max} ` : `Minimum is ${min} `) + durationText(durationUnit);
            return errorMsg;
        }
        return undefined;
    }

    updateDuration(e) {
        const { onDurationChange, onError, durationUnit } = this.props;
        const newDuration = e.target.value;
        const err = this.validateDuration(newDuration, durationUnit);
        onError(err);
        onDurationChange(e);
    }

    updateDurationUnit(e) {
        const { onUnitChange, onError, duration } = this.props;
        const newDurationUnit = e.target.value;
        const err = this.validateDuration(duration, newDurationUnit);
        onError(err);
        onUnitChange(e);
    }

    render() {
        const {
            dateStart,
            duration,
            durationUnit,
            forwardStartingDuration,
            options,
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

        if (!currentUnitBlock) return null;

        return (
            <div className="duration-picker">
                <Label text="Duration" />
                <div className="duration-input">
                    <input
                        type="number"
                        value={duration}
                        min={min}
                        max={max}
                        onChange={::this.updateDuration}
                    />
                    <select value={durationUnit} onChange={::this.updateDurationUnit}>
                        {unitOptions.map(o => <option key={o.value} value={o.value}>{o.text}</option>)}
                    </select>
                </div>
            </div>
        );
    }
}
