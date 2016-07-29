import React, { PureComponent, PropTypes } from 'react';
import { durationText } from 'binary-utils';
import { Label } from 'binary-components';
import DurationUnitPicker from './DurationUnitPicker';
import { actions } from '../_store';

export default class DurationCard extends PureComponent {

    static propTypes = {
        dateStart: PropTypes.number,
        duration: PropTypes.number,
        durationUnit: PropTypes.string,
        forwardStartingDuration: PropTypes.object,       // treated as special case
        options: PropTypes.array,
        index: PropTypes.number,
    };

    updateDuration = e => {
        const { index, durationUnit } = this.props;
        const duration = e.target.value;
        actions.reqDurationChange(index, { duration, durationUnit });
    }

    updateDurationUnit = e => {
        const { index, duration } = this.props;
        const durationUnit = e.target.value;
        actions.reqDurationChange(index, { duration, durationUnit });
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
            <div className="param-row duration-picker">
                <Label text="Duration" />
                <div className="duration-input param-field">
                    <input
                        type="number"
                        defaultValue={duration}
                        min={min}
                        max={max}
                        onChange={this.updateDuration}
                    />
                    <DurationUnitPicker
                        durationUnit={durationUnit}
                        unitOptions={unitOptions}
                        onChange={this.updateDurationUnit}
                    />
                </div>
            </div>
        );
    }
}
