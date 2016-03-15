import React, { Component, PropTypes } from 'react';
import M from '../_common/M';
import InputGroup from '../_common/InputGroup';
import RadioGroup from '../fulltrade/workaround/CustomRadioGroup';
import {
    epochToUTCTimeString,
    dateToEpoch,
    dateToUTCTimeString,
    timeStringToSeconds,
    dateToDateString,
} from '../_utils/DateUtils';

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
        this.setState({ selectedDay: new Date(e.target.value) });
    }

    removeDateStart() {
        const defaultDay = dateToEpoch(this.props.ranges[0].date);
        this.setState({ selectedDay: defaultDay });
        this.props.onStartDateChange(undefined);
    }

    onChange(e) {
        const { selectedDay } = this.state;
        const selectedEpoch = Math.floor(selectedDay.getTime()) / 1000 + timeStringToSeconds(e.target.value);
        this.props.onStartDateChange(selectedEpoch);
    }

    render() {
        const { dateStart, ranges } = this.props;
        const { selectedDay } = this.state;
        const selectedRange = selectedDay && ranges.find(r => r.date.getTime() === selectedDay.getTime());

        const min = selectedDay && dateToUTCTimeString(selectedRange.open[0]);
        const max = selectedDay && dateToUTCTimeString(selectedRange.close[0]);
        const timeString = dateStart ? epochToUTCTimeString(dateStart) : '';

        return (
            <div>
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
                    onChange={::this.onChange}
                    value={timeString}
                />}
                <button className="btn-secondary" onClick={::this.removeDateStart}>
                    <M m="Now" />
                </button>
            </div>
        );
    }
}
