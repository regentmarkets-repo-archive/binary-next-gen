import React, { Component, PropTypes } from 'react';
import nowAsEpoch from 'binary-utils/lib/nowAsEpoch';
import ErrorMsg from 'binary-components/lib/ErrorMsg';
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

    constructor(props) {
        super(props);
        this.state = {
            rcError: false,
        };
    }

    confirmIntervalUpdate = () => {
        const { actions, interval, summary } = this.props;
        const { rcError } = this.state;

        if (rcError) {
            return;
        }

        const { loginTime } = summary;
        actions.ackRealityCheck();
        const secsToWait = timeLeftToNextRealityCheck(loginTime, interval);
        setTimeout(
            () => actions.updateRealityCheckSummary()
                .then(() => actions.showRealityCheckPopUp()),
            secsToWait * 1000);
    }

    updateInterval = (interval) => {
        const { actions } = this.props;
        if (+interval > 120 || + interval < 10) {
            this.setState({ rcError: true });
        } else {
            this.setState({ rcError: false });
        }
        actions.updateRealityCheckInterval(+interval * 60);
    }

    render() {
        const { interval, showInitial, showSummary, summary } = this.props;
        const { rcError } = this.state;
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
                {rcError && <ErrorMsg text="Number should between 10 to 120" />}
            </Modal>
        );
    }
}
