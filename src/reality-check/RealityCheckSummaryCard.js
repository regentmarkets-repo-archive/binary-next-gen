import React, { Component, PropTypes } from 'react';
import M from 'binary-components/lib/M';
import TradingStatsCard from './TradingStatsCard';

export default class RealityCheckSummaryCard extends Component {
    static propTypes = {
        confirmIntervalUpdate: PropTypes.func.isRequired,
        interval: PropTypes.number.isRequired,
        loginTime: PropTypes.number.isRequired,
        sessionDuration: PropTypes.number.isRequired,
        tradingStatistic: PropTypes.shape(TradingStatsCard.propTypes).isRequired,
        updateInterval: PropTypes.func.isRequired,
    };

    render() {
        const {
            confirmIntervalUpdate,
            loginTime,
            sessionDuration,
            interval,
            tradingStatistic,
            updateInterval,
        } = this.props;

        const currentTime = new Date();
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
                            <td>{loginTime}</td>
                        </tr>
                        <tr>
                            <td>
                                <M m="Current Time" />
                            </td>
                            <td>{currentTime}</td>
                        </tr>
                        <tr>
                            <td>
                                <M m="Session Duration" />
                            </td>
                            <td>{sessionDuration}</td>
                        </tr>
                    </tbody>
                </table>
                <p>
                    <M m={`Your trading statistic since ${loginTime}`} />
                </p>
                <TradingStatsCard {...tradingStatistic} />
                <input type="number" value={interval} onChange={e => updateInterval(e.target.value)} />
                <button onClick={confirmIntervalUpdate}>
                    <M m="Continue Trading" />
                </button>
            </div>
        );
    }
}
