import React, { PureComponent, PropTypes } from 'react';
import durationText from 'binary-utils/lib/durationText';
import Label from 'binary-components/lib/Label';
import DurationUnitPicker from './DurationUnitPicker';
import { changeDurationUnit } from '../trade-params/TradeParamsCascadingUpdates';
import { actions } from '../_store';

export default class DurationCard extends PureComponent {

    static propTypes = {
        dateStart: PropTypes.number,
        duration: PropTypes.number,
        durationUnit: PropTypes.string,
        forwardStartingDuration: PropTypes.object,       // treated as special case
        forceTradeCardUpdate: PropTypes.func.isRequired,
        options: PropTypes.array,
        index: PropTypes.number,
        onUpdateTradeParams: PropTypes.func,
        contract: PropTypes.object,
        tradeParams: PropTypes.object.isRequired,
    };

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
            return (duration > max ?
                `Maximum duration is ${max} ` :
                `Minimum duration is ${min} `
            ) + durationText(durationUnit);
        }
        return undefined;
    }
    onDurationError = err => {
        const { index } = this.props;
        actions.updateTradeError(index, 'durationError', err);
    }
    updateDuration = e => {
        const { durationUnit } = this.props;
        const newDuration = e.target.value;
        const err = this.validateDuration(newDuration, durationUnit);
        this.onDurationError(err);
        this.onDurationChange(e);
    }
    onDurationChange = e => {
        const { onUpdateTradeParams } = this.props;
        onUpdateTradeParams({ duration: e.target.value });
    }
    onDurationUnitChange = e => {
        const { onUpdateTradeParams, forceTradeCardUpdate } = this.props;
        const newUnit = e.target.value;
        const { contract, tradeParams } = this.props;
        const updatedDurationUnit = changeDurationUnit(newUnit, contract, tradeParams);
        onUpdateTradeParams(updatedDurationUnit);
        forceTradeCardUpdate();
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
                        value={duration}
                        min={min}
                        max={max}
                        onChange={this.updateDuration}
                    />
                    <DurationUnitPicker
                        durationUnit={durationUnit}
                        unitOptions={unitOptions}
                        onChange={this.onDurationUnitChange}
                    />
                </div>
            </div>
        );
    }
}
