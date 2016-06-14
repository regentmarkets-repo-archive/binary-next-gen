import React, { Component, PropTypes } from 'react';
import RealityCheckInitialCard from './RealityCheckInitialCard';
import RealityCheckSummaryCard from './RealityCheckSummaryCard';

export default class RealityCheckWeb extends Component {
    static propTypes = {
        interval: PropTypes.number.isRequired,
        showInitial: PropTypes.bool,
        showSummary: PropTypes.bool,
        summary: PropTypes.object,
        updateInterval: PropTypes.func.isRequired,
        confirmIntervalUpdate: PropTypes.func.isRequired,  // do nothing beside closing the modal
    };

    render() {
        const { interval, showInitial, showSummary, summary, updateInterval, confirmIntervalUpdate } = this.props;
        return (
            <div>
                {showInitial &&
                <RealityCheckInitialCard
                    interval={interval}
                    updateInterval={updateInterval}
                    confirmIntervalUpdate={confirmIntervalUpdate}
                />}
                {showSummary &&
                <RealityCheckSummaryCard
                    {...summary}
                    interval={interval}
                    updateInterval={updateInterval}
                    confirmIntervalUpdate={confirmIntervalUpdate}
                />}
            </div>
        );
    }
    
}
