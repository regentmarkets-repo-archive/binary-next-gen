import React, { PureComponent } from 'react';
import {
    epochToUTCTimeString,
    dateToDateString,
    nowAsEpoch,
    returnValidDate,
    returnValidTime,
} from 'binary-utils';
import { M, Label } from 'binary-components';
import debounce from 'lodash.debounce';
import createDefaultStartLaterEpoch
    from '../_trade/defaults/createDefaultStartLaterEpoch';
import { actions } from '../_store';

const debounceReq = reqFn => debounce(reqFn, 400);
const debounceStartDateChange = debounceReq(actions.reqStartDateChange);
const debounceStartTimeChange = debounceReq(actions.reqStartTimeChange);
const debounceEpochChange = actions.reqStartEpochChange; // TODO: allow delay or complicate the code to increase responsiveness?

export default class ForwardStartingOptions extends PureComponent {
    props: {
        dateStart: number,
        forwardStartingDuration: object, // treated as special case
        index: number,
        startLaterOnly: boolean,
    };

    constructor(props) {
        super(props);
        const defaultEpoch = props.dateStart
            ? props.dateStart
            : createDefaultStartLaterEpoch(props.forwardStartingDuration);
        this.state = {
            showStartLater: !!props.dateStart,
            defaultDateStart: defaultEpoch,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.dateStart) {
            this.setState({ showStartLater: true });
        }
    }

    onDayChange = (e: SyntheticEvent) => {
        const { index } = this.props;
        const inputValue = e.target.value;
        debounceStartDateChange(index, returnValidDate(inputValue));
    };

    onTimeChange = (e: SyntheticEvent) => {
        const { index } = this.props;
        const inputValue = e.target.value;
        debounceStartTimeChange(index, returnValidTime(inputValue));
    };

    startNow = () => {
        this.setState({ showStartLater: false });
        debounceEpochChange(this.props.index);
    };

    startLater = () => {
        this.setState({ showStartLater: true });
        const { index, dateStart } = this.props;
        if (!dateStart) {
            const { defaultDateStart } = this.state;
            const now = nowAsEpoch();

            let startDateToUse = defaultDateStart;

            // do not use defaultDateStart when it is less than 5 minutes away from current time
            if (defaultDateStart < now + 350) {
                const newDateInSecondsResolution = now + 350;
                startDateToUse =
                    newDateInSecondsResolution -
                    newDateInSecondsResolution % 60;
            }

            debounceEpochChange(index, startDateToUse);
        }
    };

    render() {
        const {
            dateStart,
            forwardStartingDuration,
            index,
            startLaterOnly,
        } = this.props;
        const { defaultDateStart, showStartLater } = this.state;
        const ranges = forwardStartingDuration.range;

        const defaultDate = new Date(defaultDateStart * 1000);
        const defaultTime = epochToUTCTimeString(defaultDateStart);
        return (
            <div className="param-row forward-starting-picker">
                {<Label text="Start Time" />}
                <div className="param-field">
                    {!startLaterOnly &&
                        <div className="start-time-selector">
                            <label htmlFor={`start-now${index}`}>
                                <input
                                    id={`start-now${index}`}
                                    type="radio"
                                    name={`start-time${index}`}
                                    onChange={this.startNow}
                                    defaultChecked={!dateStart}
                                    disabled={startLaterOnly}
                                />
                                <M m="Now" />
                            </label>
                            <label htmlFor={`start-later${index}`}>
                                <input
                                    id={`start-later${index}`}
                                    type="radio"
                                    name={`start-time${index}`}
                                    onChange={this.startLater}
                                    defaultChecked={!!dateStart}
                                />
                                <M m="Later" />
                            </label>
                        </div>}
                    <div
                        className="forward-starting-input"
                        style={showStartLater ? {} : { display: 'none' }}
                    >
                        <input
                            type="date"
                            min={dateToDateString(ranges[0].date)}
                            onChange={this.onDayChange}
                            defaultValue={dateToDateString(defaultDate)}
                            maxLength={10}
                        />
                        <input
                            type="time"
                            onChange={this.onTimeChange}
                            defaultValue={defaultTime}
                            maxLength={8}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
