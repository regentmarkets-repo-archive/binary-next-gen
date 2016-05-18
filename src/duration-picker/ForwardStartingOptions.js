import React, { Component, PropTypes } from 'react';
import InputGroup from '../_common/InputGroup';
import epochToUTCTimeString from 'binary-utils/lib/epochToUTCTimeString';
import dateToEpoch from 'binary-utils/lib/dateToEpoch';
import dateToUTCTimeString from 'binary-utils/lib/dateToUTCTimeString';
import timeStringToSeconds from 'binary-utils/lib/timeStringToSeconds';
import dateToDateString from 'binary-utils/lib/dateToDateString';
import { createDefaultStartLaterEpoch } from '../trade-params/DefaultTradeParams';
import StartLaterToggleSwitch from './StartLaterToggleSwitch';
import Label from '../_common/Label';
import { FormattedMessage } from 'react-intl';

/**
 * assumption: for each type of contract, there will only have 1 forward starting options contract
 */

export default class ForwardStartingOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static propTypes = {
        dateStart: PropTypes.number,
        forwardStartingDuration: PropTypes.object,       // treated as special case
        index: PropTypes.number.isRequired,
        options: PropTypes.array,
        onStartDateChange: PropTypes.func,
    };

    startLaterHandler() {
        const { dateStart, onStartDateChange, forwardStartingDuration } = this.props;
        if (dateStart) {
            onStartDateChange();
        } else {
            const nextDayOpening = createDefaultStartLaterEpoch(forwardStartingDuration);
            onStartDateChange(nextDayOpening);
        }
    }

    selectDay(e) {
        const { dateStart, forwardStartingDuration } = this.props;
        const ranges = forwardStartingDuration.range;

        const minDate = dateToDateString(ranges[0].date);
        const maxDate = dateToDateString(ranges[2].date);
        const inputValue = e.target.value;
        if (inputValue > maxDate || inputValue < minDate) {
            return;
        }

        const newDayEpoch = dateToEpoch(new Date(inputValue));
        const secondsPerDay = 60 * 60 * 24;
        const intraDayEpoch = dateStart % secondsPerDay;
        this.props.onStartDateChange(newDayEpoch + intraDayEpoch);
    }

    selectTime(e) {
        const { dateStart, forwardStartingDuration } = this.props;
        const ranges = forwardStartingDuration.range;
        const selectedDay = dateStart && new Date(dateStart * 1000);
        const selectedRange = selectedDay && ranges
                .find(r => r.date.toISOString().slice(0, 10) === selectedDay.toISOString().slice(0, 10));

        const min = selectedDay && dateToUTCTimeString(selectedRange.open[0]);
        const max = selectedDay && dateToUTCTimeString(selectedRange.close[0]);
        const inputValue = e.target.value;
        if (inputValue < min || inputValue > max) {
            return;
        }

        const secondsPerDay = 60 * 60 * 24;
        const intraDayEpoch = dateStart % secondsPerDay;
        const dayEpoch = dateStart - intraDayEpoch;
        const selectedEpoch = dayEpoch + timeStringToSeconds(inputValue);
        this.props.onStartDateChange(selectedEpoch);
    }

    render() {
        const { dateStart, forwardStartingDuration, index, options } = this.props;
        const ranges = forwardStartingDuration.range;
        const allowStartLater = !!forwardStartingDuration;
        const onlyStartLater = allowStartLater && !options;

        const selectedDay = dateStart && new Date(dateStart * 1000);
        const selectedRange = selectedDay && ranges
                .find(r => r.date.toISOString().slice(0, 10) === selectedDay.toISOString().slice(0, 10));

        const min = selectedDay && dateToUTCTimeString(selectedRange.open[0]);
        const max = selectedDay && dateToUTCTimeString(selectedRange.close[0]);
        const timeString = dateStart ? epochToUTCTimeString(dateStart) : '';
        const showForwardStartingInput = allowStartLater && dateStart;

        return (
            <div className="forward-starting-group">
                {showForwardStartingInput && <Label text="Start Time" />}
                {showForwardStartingInput &&
                    <div className="forward-starting-input">
                        <InputGroup
                            type="date"
                            min={dateToDateString(ranges[0].date)}
                            max={dateToDateString(ranges[2].date)}
                            onChange={::this.selectDay}
                            value={selectedDay && dateToDateString(selectedDay)}
                        />
                        {selectedDay &&
                            <InputGroup
                                type="time"
                                min={min}
                                max={max}
                                onChange={::this.selectTime}
                                value={timeString}
                            />
                        }
                    </div>
                }
                {(allowStartLater && !onlyStartLater) &&
                <FormattedMessage id="Start Later" defaultMessage="Start Later">
                    {text =>
                        <StartLaterToggleSwitch
                            text={text}
                            id={index}
                            checked={!!dateStart}
                            onClick={::this.startLaterHandler}
                            disabled={onlyStartLater}
                        />
                    }
                </FormattedMessage>
                }
            </div>
        );
    }
}
