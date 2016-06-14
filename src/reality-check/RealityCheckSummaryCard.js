import React, { Component, PropTypes } from 'react';
import M from 'binary-components/lib/M'

export default class RealityCheckSummaryCard extends Component {
    static propTypes = {
        updateRealityCheckInterval: PropTypes.func.isRequired,
    };

    render() {
        const { loginTime, sessionDuration, tradingStatistic } = this.props;
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
                                <M m="Login Time"/>
                            </td>
                            <td>{loginTime}</td>
                        </tr>
                        <tr>
                            <td>
                                <M m="Current Time"/>
                            </td>
                            <td>{currentTime}</td>
                        </tr>
                        <tr>
                            <td>
                                <M m="Session Duration"/>
                            </td>
                            <td>{sessionDuration}</td>
                        </tr>
                    </tbody>
                </table>
                <p>
                    <M m={`Your trading statistic since ${loginTime}`} />
                </p>
                //
                <input type="number" defaultValue="10" />
                <button>
                    <M m"Continue Trading" />
                </button>
            </div>
        );
    }
}

