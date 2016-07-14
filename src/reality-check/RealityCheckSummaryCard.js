import React, { PureComponent, PropTypes } from 'react';
import M from 'binary-components/lib/M';
import Td from 'binary-components/lib/Td';
import P from 'binary-components/lib/P';
import Button from 'binary-components/lib/Button';
import secsToTimeString from 'binary-utils/lib/secondsToTimeString';
import TradingStatsCard from './TradingStatsCard';

export default class RealityCheckSummaryCard extends PureComponent {

    static propTypes = {
        confirmIntervalUpdate: PropTypes.func.isRequired,
        interval: PropTypes.number.isRequired,
        loginTime: PropTypes.number.isRequired,
        sessionDuration: PropTypes.number.isRequired,
        updateInterval: PropTypes.func.isRequired,
    };

    onIntervalChange = e =>
        this.props.updateInterval(e.target.value);

    render() {
        const {
            confirmIntervalUpdate,
            loginTime,
            sessionDuration,
            interval,
        } = this.props;

        const currentTime = new Date();
        const loginDate = new Date(loginTime * 1000);
        const durationString = secsToTimeString(sessionDuration);
        return (
            <div>
                <h3>
                    <M m="Reality Check" />
                </h3>
                <table>
                    <tbody>
                        <tr>
                            <Td text="Login Time" />
                            <td>{loginDate.toUTCString()}</td>
                        </tr>
                        <tr>
                            <Td text="Current Time" />
                            <td>{currentTime.toUTCString()}</td>
                        </tr>
                        <tr>
                            <Td text="Session Duration" />
                            <td>{durationString}</td>
                        </tr>
                    </tbody>
                </table>
                <p>
                    <M m="Your trading statistic since " /> {loginDate.toUTCString()} />
                </p>
                <TradingStatsCard {...this.props} />
                <P text="Specify your reality-check interval in minutes" />
                <input
                    type="number"
                    value={Math.round(interval / 60)}
                    onChange={this.onIntervalChange}
                />
                <Button text="Continue Trading" onClick={confirmIntervalUpdate} />
            </div>
        );
    }
}
