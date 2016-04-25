import React, { Component, PropTypes } from 'react';
import InputGroup from '../_common/InputGroup';
import epochToUTCTimeString from 'binary-utils/lib/epochToUTCTimeString';
import dateToEpoch from 'binary-utils/lib/dateToEpoch';
import dateToUTCTimeString from 'binary-utils/lib/dateToUTCTimeString';
import timeStringToSeconds from 'binary-utils/lib/timeStringToSeconds';
import dateToDateString from 'binary-utils/lib/dateToDateString';

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
        onStartDateChange: PropTypes.func,
        ranges: PropTypes.array.isRequired,
    };

    selectDay(e) {
        const { dateStart } = this.props;
        const newDayEpoch = dateToEpoch(new Date(e.target.value));
        const secondsPerDay = 60 * 60 * 24;
        const intraDayEpoch = dateStart % secondsPerDay;
        this.props.onStartDateChange(newDayEpoch + intraDayEpoch);
    }

    selectTime(e) {
        const { dateStart } = this.props;
        const secondsPerDay = 60 * 60 * 24;
        const intraDayEpoch = dateStart % secondsPerDay;
        const dayEpoch = dateStart - intraDayEpoch;
        const selectedEpoch = dayEpoch + timeStringToSeconds(e.target.value);
        this.props.onStartDateChange(selectedEpoch);
    }

    render() {
        const { dateStart, ranges } = this.props;
        const selectedDay = new Date(dateStart * 1000);
        const selectedRange = selectedDay && ranges.find(r => r.date.toDateString() === selectedDay.toDateString());

        const min = selectedDay && dateToUTCTimeString(selectedRange.open[0]);
        const max = selectedDay && dateToUTCTimeString(selectedRange.close[0]);
        const timeString = dateStart ? epochToUTCTimeString(dateStart) : '';

        return (
            <div className="row row-spacer">
                <InputGroup
                    type="date"
                    min={dateToDateString(ranges[0].date)}
                    max={dateToDateString(ranges[2].date)}
                    onChange={::this.selectDay}
                    value={selectedDay && dateToDateString(selectedDay)}
                />
                {selectedDay && <InputGroup
                    type="time"
                    min={min}
                    max={max}
                    onChange={::this.selectTime}
                    value={timeString}
                />}
            </div>
        );
    }
}
