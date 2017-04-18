import React, { PureComponent } from 'react';
import { M, P, Button } from 'binary-components';

export default class RealityCheckInitialCard extends PureComponent {
    props: {
        interval: number,
        updateInterval: (e: SyntheticEvent) => void,
        confirmIntervalUpdate: (e: SyntheticEvent) => void,
    };

    onIntervalChange = (e: SyntheticEvent) =>
        this.props.updateInterval(e.target.value);

    render() {
        const { confirmIntervalUpdate, interval } = this.props;
        return (
            <div>
                <h3>
                    <M m="Reality Check" />
                </h3>
                <P text="Options trading can become a real addiction, as can any other activity pushed to its limits.
                        To avoid the danger of such an addiction, we provide a reality-check that gives you a summary of
                        your trades and accounts on a regular basis." />
                <P text="Specify your reality-check interval in minutes" />
                <input
                    type="number"
                    value={Math.round(interval / 60)}
                    onChange={this.onIntervalChange}
                />
                <Button
                    text="Continue Trading"
                    onClick={confirmIntervalUpdate}
                />
            </div>
        );
    }
}
