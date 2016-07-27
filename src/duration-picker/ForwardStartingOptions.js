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
        options: PropTypes.array,
        contract: PropTypes.object,
        tradeParams: PropTypes.object.isRequired,
        onUpdateTradeParams: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            showStartLater: !!props.dateStart,
            defaultDateStart: createDefaultStartLaterEpoch(props.forwardStartingDuration),
        };
    }

    onDayChange = e => {
        const { dateStart } = this.props;
        const inputValue = e.target.value;
        const newDayEpoch = dateToEpoch(new Date(inputValue));
        const secondsPerDay = 60 * 60 * 24;
        const intraDayEpoch = dateStart % secondsPerDay;
        this.onStartDateChange(newDayEpoch + intraDayEpoch);
    }

    onTimeChange = e => {
        const { dateStart } = this.props;
        const inputValue = e.target.value;
        const secondsPerDay = 60 * 60 * 24;
        const intraDayEpoch = dateStart % secondsPerDay;
        const dayEpoch = dateStart - intraDayEpoch;
        const selectedEpoch = dayEpoch + timeStringToSeconds(inputValue);
        this.onStartDateChange(selectedEpoch);
    }

    startNow = () => {
        this.setState({ showStartLater: false });
        this.onStartDateChange();
    }

    startLater = () => {
        this.setState({ showStartLater: true });
        const { dateStart, forwardStartingDuration } = this.props;
        if (!dateStart) {
            const nextDayOpening = createDefaultStartLaterEpoch(forwardStartingDuration);
            this.onStartDateChange(nextDayOpening);
        }
    }

    debouncedStartDateChange = debounceForMobileAndWeb(epoch => {
        const { contract, tradeParams, onUpdateTradeParams } = this.props;
        const updatedStartDate = changeStartDate(epoch, contract, tradeParams);
        onUpdateTradeParams(updatedStartDate);
    })

    onStartDateChange = epoch => {
        actions.updateTradeUIState(this.props.index, 'disabled', true);
        this.debouncedStartDateChange(epoch);
    }

    render() {
        const { dateStart, forwardStartingDuration, index, options } = this.props;
        const { showStartLater, defaultDateStart } = this.state;
        const ranges = forwardStartingDuration.range;
        const allowStartLater = !!forwardStartingDuration;
        const onlyStartLater = allowStartLater && !options;

        const defaultDate = new Date(defaultDateStart * 1000);
        const defaultTime = epochToUTCTimeString(defaultDateStart);

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
                    {allowStartLater &&
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
                    </div>}
                </div>
            </div>
        );
    }
}
