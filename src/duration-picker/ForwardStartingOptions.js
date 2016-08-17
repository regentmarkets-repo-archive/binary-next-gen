import React, { PureComponent, PropTypes } from 'react';
import { epochToUTCTimeString, dateToDateString, returnValidDate, returnValidTime } from 'binary-utils';
import { M, Label, WorkaroundDateTimeInput } from 'binary-components';
import debounce from 'lodash.debounce';
import createDefaultStartLaterEpoch from '../_trade/defaults/createDefaultStartLaterEpoch';
import { actions } from '../_store';

const debounceReq = reqFn => debounce(reqFn, 400);
const debounceStartDateChange = debounceReq(actions.reqStartDateChange);
const debounceStartTimeChange = debounceReq(actions.reqStartTimeChange);
const debounceEpochChange = actions.reqStartEpochChange;        // TODO: allow delay or complicate the code to increase responsiveness?

export default class ForwardStartingOptions extends PureComponent {

    static propTypes = {
        dateStart: PropTypes.number,
        forwardStartingDuration: PropTypes.object.isRequired,       // treated as special case
        index: PropTypes.number.isRequired,
        startLaterOnly: PropTypes.bool,
    };

    constructor(props) {
        super(props);
        this.state = {
            showStartLater: !!props.dateStart,
            defaultDateStart: createDefaultStartLaterEpoch(props.forwardStartingDuration),
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.dateStart) {
            this.setState({ showStartLater: true });
        }
    }

    onDayChange = e => {
        const { index } = this.props;
        const inputValue = e.target.value;
        debounceStartDateChange(index, returnValidDate(inputValue));
    }

    onTimeChange = e => {
        const { index } = this.props;
        const inputValue = e.target.value;
        debounceStartTimeChange(index, returnValidTime(inputValue));
    }

    startNow = () => {
        this.setState({ showStartLater: false });
        debounceEpochChange(this.props.index);
    }

    startLater = () => {
        this.setState({ showStartLater: true });
        const { index, dateStart } = this.props;
        if (!dateStart) {
            debounceEpochChange(index, this.state.defaultDateStart);
        }
    }

    render() {
        const { dateStart, forwardStartingDuration, index, startLaterOnly } = this.props;
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
                        </div>
                    }
                    <div className="forward-starting-input" style={showStartLater ? {} : { display: 'none' }}>
                        <WorkaroundDateTimeInput
                            type="date"
                            min={dateToDateString(ranges[0].date)}
                            onChange={this.onDayChange}
                            defaultValue={dateToDateString(defaultDate)}
                            maxLength="10"
                        />
                        <WorkaroundDateTimeInput
                            type="time"
                            onChange={this.onTimeChange}
                            defaultValue={defaultTime}
                            maxLength="8"
                        />
                    </div>
                </div>
            </div>
        );
    }
}
