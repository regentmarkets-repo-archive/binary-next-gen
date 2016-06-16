import React, { Component, PropTypes } from 'react';
import nowAsEpoch from 'binary-utils/lib/nowAsEpoch';
import RealityCheckInitialCard from './RealityCheckInitialCard';
import RealityCheckSummaryCard from './RealityCheckSummaryCard';

function computeIntervalForNextPopup(loginTime, interval) {
    const currentTime = nowAsEpoch();
    const timeLeft = interval - ((currentTime - loginTime) % interval);
    return timeLeft;
}

export default class RealityCheckWeb extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        interval: PropTypes.number.isRequired,           // in seconds
        showInitial: PropTypes.bool,
        showSummary: PropTypes.bool,
        summary: PropTypes.object,
        updateInterval: PropTypes.func.isRequired,
        confirmIntervalUpdate: PropTypes.func.isRequired,  // do nothing beside closing the modal
    };

    confirmIntervalUpdate() {
        const { actions, interval, summary } = this.props;
        const { logintime } = summary;
        actions.updateRealityCheck('acknowledged', true);
        actions.updateRealityCheck('showInitial', false);
        actions.updateRealityCheck('showSummary', false);
        const secsToWait = computeIntervalForNextPopup(logintime, interval);
        setTimeout(() => actions.updateRealityCheck('showSummary', true), secsToWait * 1000);
    }

    render() {
        const { interval, showInitial, showSummary, summary, updateInterval } = this.props;
        return (
            <div>
                {showInitial &&
                <RealityCheckInitialCard
                    interval={interval}
                    updateInterval={updateInterval}
                    confirmIntervalUpdate={::this.confirmIntervalUpdate}
                />}
                {showSummary &&
                <RealityCheckSummaryCard
                    {...summary}
                    interval={interval}
                    updateInterval={updateInterval}
                    confirmIntervalUpdate={::this.confirmIntervalUpdate}
                />}
            </div>
        );
    }
    
}
