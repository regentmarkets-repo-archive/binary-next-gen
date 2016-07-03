import React, { Component, PropTypes } from 'react';
import M from 'binary-components/lib/M';
import P from 'binary-components/lib/P';
import Button from 'binary-components/lib/Button';

export default class RealityCheckInitialCard extends Component {

    static propTypes = {
        interval: PropTypes.number.isRequired,
        updateInterval: PropTypes.func.isRequired,
        confirmIntervalUpdate: PropTypes.func.isRequired,
    };

    onIntervalChange = e =>
        this.props.updateInterval(e.target.value);

    render() {
        const { confirmIntervalUpdate, interval } = this.props;
        return (
            <div>
                <h3>
                    <M m="Reality Check" />
                </h3>
                <P
                    text="Options trading can become a real addiction, as can any other activity pushed to its limits.
                        To avoid the danger of such an addiction, we provide a reality-check that gives you a summary of
                        your trades and accounts on a regular basis."
                />
                <P text="Please specify your preferred reality-check interval in minutes" />
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
