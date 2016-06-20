import React, { Component, PropTypes } from 'react';
import nowAsEpoch from 'binary-utils/lib/nowAsEpoch';
import Modal from '../containers/Modal';
import RealityCheckInitialCard from './RealityCheckInitialCard';
import RealityCheckSummaryCard from './RealityCheckSummaryCard';

export const timeLeftToNextRealityCheck = (loginTime, interval) =>
    interval - ((nowAsEpoch() - loginTime) % interval);

export default class RealityCheckWeb extends Component {

    static propTypes = {
        actions: PropTypes.object.isRequired,
        interval: PropTypes.number.isRequired,           // in seconds
        showInitial: PropTypes.bool,
        showSummary: PropTypes.bool,
        summary: PropTypes.object,
    };

    confirmIntervalUpdate = () => {
        const { actions, interval, summary } = this.props;
        const { loginTime } = summary;
        actions.updateRealityCheck('acknowledged', true);
        actions.updateRealityCheck('showInitial', false);
        actions.updateRealityCheck('showSummary', false);
        const secsToWait = timeLeftToNextRealityCheck(loginTime, interval);
        setTimeout(
            () => actions.updateRealityCheckSummary()
                .then(() => actions.updateRealityCheck('showSummary', true)),
            secsToWait * 1000);
    }

    updateInterval = (interval) => {
        const { actions } = this.props;
        actions.updateRealityCheck('interval', +interval * 60);
    }

    render() {
        const { interval, showInitial, showSummary, summary } = this.props;
        if (!showInitial && !showSummary) return null;
        return (
            <Modal shown>
                {showInitial &&
                <RealityCheckInitialCard
                    interval={interval}
                    updateInterval={this.updateInterval}
                    confirmIntervalUpdate={this.confirmIntervalUpdate}
                />}
                {showSummary && summary &&
                <RealityCheckSummaryCard
                    {...summary}
                    interval={interval}
                    updateInterval={this.updateInterval}
                    confirmIntervalUpdate={this.confirmIntervalUpdate}
                />}
            </Modal>
        );
    }
}
