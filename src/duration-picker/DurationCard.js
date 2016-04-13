import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { FormattedMessage } from 'react-intl';
import ErrorMsg from '../_common/ErrorMsg';
import SelectGroup from '../_common/SelectGroup';
import InputGroup from '../_common/InputGroup';
import ForwardStartingOptions from './ForwardStartingOptions';
import durationText from 'binary-utils/lib/durationText';
import StartLaterToggleSwitch from './StartLaterToggleSwitch';
import { createDefaultStartLaterEpoch } from '../trade-params/DefaultTradeParams';

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
        tradeIndex: PropTypes.any.isRequired,
    };

    shouldComponentUpdate = shouldPureComponentUpdate;

    startLaterHandler() {
        const { dateStart, onStartDateChange, forwardStartingDuration } = this.props;
        if (dateStart) {
            onStartDateChange();
        } else {
            const nextDayOpening = createDefaultStartLaterEpoch(forwardStartingDuration);
            onStartDateChange(nextDayOpening);
        }
    }

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
            tradeIndex,
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
            <div>
                {(allowStartLater && !onlyStartLater) &&
                    <FormattedMessage id="Start Later" defaultMessage="Start Later">
                        {text =>
                            <StartLaterToggleSwitch
                                text={text}
                                id={tradeIndex}
                                checked={!!dateStart}
                                onClick={::this.startLaterHandler}
                                disabled={onlyStartLater}
                            />
                        }
                    </FormattedMessage>
                }
                {!!dateStart &&
                    <ForwardStartingOptions
                        dateStart={dateStart}
                        ranges={forwardStartingDuration.range}
                        onStartDateChange={onStartDateChange}
                    />
                }
                {currentUnitBlock ?
                    <div id="duration-fields" className="row">
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
                    </div> :
                    <div />
                }
                <ErrorMsg shown={showError} text={errorMsg} />
            </div>
        );
    }
}
