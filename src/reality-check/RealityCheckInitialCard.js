import React, { Component, PropTypes } from 'react';
import M from 'binary-components/lib/M';

export default class RealityCheckInitialCard extends Component {

    static propTypes = {
        interval: PropTypes.number.isRequired,
        updateInterval: PropTypes.func.isRequired,
        confirmIntervalUpdate: PropTypes.func.isRequired,
    };

    render() {
        const { confirmIntervalUpdate, interval, updateInterval } = this.props;
        return (
            <div>
                <h3>
                    <M m="Reality Check" />
                </h3>
                <p>
                    <M
                        m="Options trading can become a real addiction, as can any other activity pushed to its limits.
                        To avoid the danger of such an addiction, we provide a reality-check that gives you a summary of
                        your trades and accounts on a regular basis."
                    />
                </p>
                <p>
                    <M m="Please specify your preferred reality-check interval in minutes" />
                </p>
                <input type="number" value={Math.round(interval / 60)} onChange={e => updateInterval(e.target.value)} />
                <button onClick={confirmIntervalUpdate}>
                    <M m="Continue Trading" />
                </button>
            </div>
        );
    }
}
