import React, { Component, PropTypes } from 'react';
import epochToUTCTimeString from 'binary-utils/lib/epochToUTCTimeString';
import dateToEpoch from 'binary-utils/lib/dateToEpoch';
import timeStringToSeconds from 'binary-utils/lib/timeStringToSeconds';
import dateToDateString from 'binary-utils/lib/dateToDateString';
import { createDefaultStartLaterEpoch } from '../trade-params/DefaultTradeParams';
import M from 'binary-components/lib/M';
import Label from 'binary-components/lib/Label';

/**
 * assumption: for each type of contract, there will only have 1 forward starting options contract
 */

export default class ForwardStartingOptions extends Component {

    static propTypes = {
        dateStart: PropTypes.number,
        forwardStartingDuration: PropTypes.object,       // treated as special case
        index: PropTypes.number.isRequired,
        options: PropTypes.array,
        onStartDateChange: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    onDayChange = e => {
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

    onTimeChange = e => {
        const { dateStart } = this.props;
        const inputValue = e.target.value;
        const secondsPerDay = 60 * 60 * 24;
        const intraDayEpoch = dateStart % secondsPerDay;
        const dayEpoch = dateStart - intraDayEpoch;
        const selectedEpoch = dayEpoch + timeStringToSeconds(inputValue);
        this.props.onStartDateChange(selectedEpoch);
    }

    startNow = () => {
        const { onStartDateChange } = this.props;
        onStartDateChange();
    }

    startLater = () => {
        const { dateStart, onStartDateChange, forwardStartingDuration } = this.props;
        if (!dateStart) {
            const nextDayOpening = createDefaultStartLaterEpoch(forwardStartingDuration);
            onStartDateChange(nextDayOpening);
        }
    }

    render() {
        const { dateStart, forwardStartingDuration, index, options } = this.props;
        const ranges = forwardStartingDuration.range;
        const allowStartLater = !!forwardStartingDuration;
        const onlyStartLater = allowStartLater && !options;

        const selectedDay = dateStart && new Date(dateStart * 1000);

        const timeString = dateStart ? epochToUTCTimeString(dateStart) : '';
        const showForwardStartingInput = allowStartLater && dateStart;

        return (
            <div className="param-row forward-starting-picker">
                {allowStartLater && <Label text={'Start Time'} />}
                <div className="param-field">
                    {allowStartLater && !onlyStartLater &&
                        <div className="start-time-selector">
                            <label>
                                <input
                                    type="radio"
                                    name={`start-time${index}`}
                                    onChange={this.startNow}
                                    checked={!dateStart}
                                    disabled={onlyStartLater}
                                />
                                <M m="Now" />
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name={`start-time${index}`}
                                    onChange={this.startLater}
                                    checked={!!dateStart}
                                    disabled={!allowStartLater}
                                />
                                <M m="Later" />
                            </label>
                        </div>
                    }
                    {showForwardStartingInput &&
                        <div className="forward-starting-input">
                            <input
                                type="date"
                                min={dateToDateString(ranges[0].date)}
                                max={dateToDateString(ranges[2].date)}
                                onChange={this.onDayChange}
                                value={selectedDay && dateToDateString(selectedDay)}
                            />
                            {selectedDay &&
                                <input
                                    type="time"
                                    onChange={this.onTimeChange}
                                    defaultValue={timeString}
                                />
                            }
                        </div>
                    }
                </div>
            </div>
        );
    }
}
