import React, { PureComponent, PropTypes } from 'react';
import { Error } from 'binary-components';
import { timeLeftToNextRealityCheck } from 'binary-utils';
import { actions } from '../_store';
import Modal from '../containers/Modal';
import RealityCheckInitialCard from './RealityCheckInitialCard';
import RealityCheckSummaryCard from './RealityCheckSummaryCard';

export default class RealityCheckWeb extends PureComponent {

    static propTypes = {
        interval: PropTypes.number.isRequired, // in seconds
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
        const { interval, summary } = this.props;
        const { rcError } = this.state;

        if (rcError) {
            return;
        }

        const { loginTime } = summary;
        actions.ackRealityCheck();
        const toWait = timeLeftToNextRealityCheck(loginTime, interval) * 1000;
        setTimeout(() =>
            actions.updateRealityCheckSummary().then(() =>
                actions.showRealityCheckPopUp()
            ), toWait);
    }

    updateInterval = (interval) => {
        if (+interval > 120 || +interval < 10) {
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
                {rcError && <Error text="Number should between 10 to 120" />}
            </Modal>
        );
    }
}
