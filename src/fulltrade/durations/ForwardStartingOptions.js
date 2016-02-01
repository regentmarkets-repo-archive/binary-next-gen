import React, { Component, PropTypes } from 'react';
import { InputGroup, CollapsibleFormSnippet, M } from '../../_common';
import RadioGroup from '../workaround/CustomRadioGroup';
import { epochToUTCTimeString, dateToEpoch, dateToUTCTimeString, timeStringToSeconds } from '../../_utils/DateUtils';
/**
 * assumption: for each type of contract, there will only have 1 forward starting options contract
 */

export default class ForwardStartingOptions extends Component {
    constructor(props) {
        super(props);
        const defaultDay = dateToEpoch(props.ranges[0].date);
        this.state = {
            selectedDay: defaultDay,
        };
    }

    static propTypes = {
        dateStart: PropTypes.number,
        onStartDateChange: PropTypes.func,
        ranges: PropTypes.array.isRequired,
    };

    selectDay(e) {
        this.setState({ selectedDay: e.target.value });
    }

    removeDateStart() {
        const defaultDay = dateToEpoch(this.props.ranges[0].date);
        this.setState({ selectedDay: defaultDay });
        this.props.onStartDateChange(undefined);
    }

    onChange(e) {
        const { selectedDay } = this.state;
        const selectedEpoch = selectedDay + timeStringToSeconds(e.target.value);
        this.props.onStartDateChange(selectedEpoch);
    }

    render() {
        const { dateStart, ranges } = this.props;
        const dayOptions = ranges.map(d => {
            const day = d.date;
            return { text: day.toLocaleDateString(), value: dateToEpoch(day) };
        });
        const { selectedDay } = this.state;
        const selectedRange = ranges.find(r => dateToEpoch(r.date) === selectedDay);
        const selectedIdx = ranges.indexOf(selectedRange);
        const min = dateToUTCTimeString(ranges[selectedIdx].open);
        const max = dateToUTCTimeString(ranges[selectedIdx].close);
        const timeString = dateStart ? epochToUTCTimeString(dateStart) : '';

        return (
            <CollapsibleFormSnippet label="Start times">
                <RadioGroup
                    options={dayOptions}
                    onChange={::this.selectDay}
                    value={selectedDay}
                />
                <InputGroup
                    type="time"
                    min={min}
                    max={max}
                    onChange={::this.onChange}
                    value={timeString}
                />
                <button className="btn-secondary" onClick={::this.removeDateStart}>
                    <M m="Now" />
                </button>
            </CollapsibleFormSnippet>
        );
    }
}
