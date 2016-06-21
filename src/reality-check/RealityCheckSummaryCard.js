import React, { Component, PropTypes } from 'react';
import M from 'binary-components/lib/M';
import secsToTimeString from 'binary-utils/lib/secondsToTimeString';
import TradingStatsCard from './TradingStatsCard';

export default class RealityCheckSummaryCard extends Component {

    static propTypes = {
        confirmIntervalUpdate: PropTypes.func.isRequired,
        interval: PropTypes.number.isRequired,
        loginTime: PropTypes.number.isRequired,
        sessionDuration: PropTypes.number.isRequired,
        updateInterval: PropTypes.func.isRequired,
    };

    render() {
        const {
            confirmIntervalUpdate,
            loginTime,
            sessionDuration,
            interval,
            updateInterval,
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
                            <td>
                                <M m="Login Time" />
                            </td>
                            <td>{loginDate.toUTCString()}</td>
                        </tr>
                        <tr>
                            <td>
                                <M m="Current Time" />
                            </td>
                            <td>{currentTime.toUTCString()}</td>
                        </tr>
                        <tr>
                            <td>
                                <M m="Session Duration" />
                            </td>
                            <td>{durationString}</td>
                        </tr>
                    </tbody>
                </table>
                <p>
                    <M m={`Your trading statistic since ${loginDate.toUTCString()}`} />
                </p>
                <TradingStatsCard {...this.props} />
                <input type="number" value={Math.round(interval / 60)} onChange={e => updateInterval(e.target.value)} />
                <button onClick={confirmIntervalUpdate}>
                    <M m="Continue Trading" />
                </button>
            </div>
        );
    }
}
