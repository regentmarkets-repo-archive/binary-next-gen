import React, { PureComponent, PropTypes } from 'react';
import { epochToUTCTimeString, dateToEpoch,
    timeStringToSeconds, dateToDateString } from 'binary-utils';
import { M, Label } from 'binary-components';
import { createDefaultStartLaterEpoch } from '../trade-params/DefaultTradeParams';
import { changeStartDate } from '../trade-params/TradeParamsCascadingUpdates';
import { debounceForMobileAndWeb } from '../trade-params/TradeParams';
import { actions } from '../_store';

/**
 * assumption: for each type of contract, there will only have 1 forward starting options contract
 */

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

    onDayChange = e => {
        const { dateStart, index } = this.props;
        const inputValue = e.target.value;
        const newDayEpoch = dateToEpoch(new Date(inputValue));
        const secondsPerDay = 60 * 60 * 24;
        const intraDayEpoch = dateStart % secondsPerDay;
        actions.reqStartDateChange(index, newDayEpoch + intraDayEpoch);
    }

    onTimeChange = e => {
        const { dateStart, index } = this.props;
        const inputValue = e.target.value;
        const secondsPerDay = 60 * 60 * 24;
        const intraDayEpoch = dateStart % secondsPerDay;
        const dayEpoch = dateStart - intraDayEpoch;
        const selectedEpoch = dayEpoch + timeStringToSeconds(inputValue);
        actions.reqStartDateChange(index, selectedEpoch);
    }

    startNow = () => {
        this.setState({ showStartLater: false });
        actions.reqStartDateChange(this.props.index);
    }

    startLater = () => {
        this.setState({ showStartLater: true });
        const { dateStart } = this.props;
        if (!dateStart) {
            actions.reqStartDateChange(this.props.index, this.state.defaultDateStart);
        }
    }

    render() {
        const { dateStart, forwardStartingDuration, index, startLaterOnly } = this.props;
        const { showStartLater, defaultDateStart } = this.state;
        const ranges = forwardStartingDuration.range;

        const defaultDate = new Date(defaultDateStart * 1000);
        const defaultTime = epochToUTCTimeString(defaultDateStart);

        return (
            <div className="param-row forward-starting-picker">
                {<Label text={'Start Time'} />}
                <div className="param-field">
                    {!startLaterOnly &&
                        <div className="start-time-selector">
                            <label>
                                <input
                                    type="radio"
                                    name={`start-time${index}`}
                                    onChange={this.startNow}
                                    checked={!dateStart}
                                    disabled={startLaterOnly}
                                />
                                <M m="Now" />
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name={`start-time${index}`}
                                    onChange={this.startLater}
                                    checked={!!dateStart}
                                />
                                <M m="Later" />
                            </label>
                        </div>
                    }
                    <div className="forward-starting-input" style={showStartLater ? {} : { display: 'none' }}>
                        <input
                            type="date"
                            min={dateToDateString(ranges[0].date)}
                            max={dateToDateString(ranges[2].date)}
                            onChange={this.onDayChange}
                            defaultValue={dateToDateString(defaultDate)}
                        />
                        <input
                            type="time"
                            onChange={this.onTimeChange}
                            defaultValue={defaultTime}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
