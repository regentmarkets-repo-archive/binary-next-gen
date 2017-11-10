import React, { PureComponent, SyntheticEvent } from 'react';
import { dateToDateString } from 'binary-utils';
import { M, Label } from 'binary-components';
import debounce from 'lodash.debounce';
import moment from 'moment';
import createDefaultStartLaterEpoch from '../_trade/defaults/createDefaultStartLaterEpoch';
import { actions } from '../_store';

// A 400 millisecond delay is set to prevent the datetime fields from
// updating before the user keys finish. This will not be necessary if
// there is a datepicker.
// TODO: Get a date picker (only desktop browsers need this)
const debounceReq = reqFn => debounce(reqFn, 400);
const changeStartEpoch = debounceReq(actions.reqStartEpochChange);

export default class ForwardStartingOptions extends PureComponent {

    props: {
        dateStart: number,
        forwardStartingDuration: object,       // treated as special case
        index: number,
        startLaterOnly: boolean,
    };

    constructor(props) {
        super(props);
        const defaultEpoch = props.dateStart ? props.dateStart : createDefaultStartLaterEpoch(props.forwardStartingDuration);
        const forwardDate = moment.unix(defaultEpoch).format('YYYY-MM-DD');
        const forwardTime = moment.unix(defaultEpoch).format('HH:mm');
        this.state = {
            showStartLater: !!props.dateStart,
            forwardDate,
            forwardTime
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.dateStart) {
            this.setState({ showStartLater: true });
        }
    }

    updateAndChangeStartEpoch = () => {
        const { index } = this.props;
        const { forwardDate, forwardTime } = this.state;
        const epoch = moment(forwardDate + ' ' + forwardTime).valueOf() / 1000;
        changeStartEpoch(index, epoch);
    }

    onDateTimeChange = (e: SyntheticEvent) => {
        this.setState({ [e.target.name]: e.target.value }, () => {
            this.updateAndChangeStartEpoch();
        });
    }

    startNow = () => {
        this.setState({ showStartLater: false });
        // passing undefined sets the current datetime (now)
        changeStartEpoch(this.props.index, undefined);
    }

    startLater = () => {
        this.setState({ showStartLater: true });
        // restore the stored forward datetime values
        this.updateAndChangeStartEpoch();
    }

    render() {
        const { dateStart, forwardStartingDuration, index, startLaterOnly } = this.props;
        const { showStartLater, forwardDate, forwardTime } = this.state;
        const ranges = forwardStartingDuration.range;

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
                        <input
                            type="date"
                            min={dateToDateString(ranges[0].date)}
                            onChange={this.onDateTimeChange}
                            name="forwardDate"
                            value={forwardDate}
                            maxLength={10}
                        />
                        <input
                            type="time"
                            onChange={this.onDateTimeChange}
                            name="forwardTime"
                            value={forwardTime}
                            maxLength={8}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
