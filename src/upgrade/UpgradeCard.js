import React, { Component, PropTypes } from 'react';
import M from 'binary-components/lib/M';
import LogoSpinner from 'binary-components/lib/LogoSpinner';
import UpgradeStep1 from './UpgradeStep1';
import UpgradeStep2 from './UpgradeStep2';
import UpgradeStep3 from './UpgradeStep3';

export default class UpgradeCard extends Component {

	static propTypes = {
		activeStep: PropTypes.number.isRequired,
		progress: PropTypes.bool.isRequired,
	};

	static contextTypes = {
		router: PropTypes.object.isRequired,
	};

	componentWillReceiveProps(nextProps) {
		const { router } = this.context;
		if (nextProps.upgrade.get('success')) {
			router.push('/');
		}
	}

	render() {
		const { activeStep, progress } = this.props;

		const steps = [
			<UpgradeStep1 {...this.props} />,
			<UpgradeStep2 {...this.props} />,
			<UpgradeStep3 {...this.props} />,
		];

		return (
			<div className="wide-form" >
				<p className="media">
					<LogoSpinner spinning={progress} />
				</p>
				<h3><M m="Upgrade to Real Money Account" /></h3>
				{steps[activeStep]}
			</div>
		);
	}
}
