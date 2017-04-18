import React, { PureComponent } from 'react';
import { durationText } from 'binary-utils';
import { Label, NumericInput } from 'binary-components';
import debounce from 'lodash.debounce';
import DurationUnitPicker from './DurationUnitPicker';
import { actions } from '../_store';

const debounceReqDurationChange = debounce(actions.reqDurationChange, 400);

export default class DurationCard extends PureComponent {
    props: {
        dateStart: number,
        duration: number,
        durationUnit: string,
        forwardStartingDuration: object, // treated as special case
        options: any[],
        index: number,
    };

    updateDuration = (duration: number) => {
        const { index } = this.props;
        debounceReqDurationChange(index, duration);
    };

    updateDurationUnit = (e: SyntheticEvent) => {
        const { index } = this.props;
        const durationUnit = e.target.value;
        actions.reqDurationUnitChange(index, durationUnit);
    };

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
        const forwardOptions =
            forwardStartingDuration && forwardStartingDuration.options;

        let optionsToUse;

        if (onlyStartLater) {
            optionsToUse = forwardOptions;
        } else if (!allowStartLater) {
            optionsToUse = options;
        } else {
            optionsToUse = dateStart ? forwardOptions : options;
        }

        const unitOptions = optionsToUse.map(opt => ({
            value: opt.unit,
            text: durationText(opt.unit),
        }));
        const currentUnitBlock = optionsToUse.find(
            opt => opt.unit === durationUnit,
        );

        const min = currentUnitBlock && currentUnitBlock.min;
        const max = currentUnitBlock && currentUnitBlock.max;

        if (!currentUnitBlock) return null;

        return (
            <div className="param-row duration-picker">
                <Label text="Duration" />
                <div className="duration-input param-field">
                    <NumericInput
                        className="numeric-input"
                        integer
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
