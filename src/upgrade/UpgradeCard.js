import React, { Component } from 'react';
import M from '../_common/M';
import LogoSpinner from '../_common/LogoSpinner';
import UpgradeStep1 from './UpgradeStep1';
import UpgradeStep2 from './UpgradeStep2';
import UpgradeStep3 from './UpgradeStep3';

export default class UpgradeCard extends Component {

	static propTypes = {
		upgrade: React.PropTypes.object.isRequired,
		actions: React.PropTypes.object.isRequired,
		history: React.PropTypes.object.isRequired,
	};

	static contextTypes = {
		router: React.PropTypes.object.isRequired,
	};

	componentWillReceiveProps(nextProps) {
		const { router } = this.context;
		if (nextProps.upgrade.get('success')) {
			router.push('/');
		}
	}

	render() {
		const {
			activeStep,
			progress,
			firstName,
			lastName,
			dateOfBirth,
			addressCity,
			addressPostcode,
			addressLine1,
			addressLine2,
			phone,
			residence,
			secretQuestion,
			secretAnswer,
			addressState,
			error,
			} = this.props.upgrade.toJS();

		const actions = this.props.actions;
		const steps = [
			<UpgradeStep1
				firstName={firstName}
				lastName={lastName}
				dateOfBirth={dateOfBirth}
				actions={actions}
			/>,
			<UpgradeStep2
				addressCity={addressCity}
				addressPostcode={addressPostcode}
				addressLine1={addressLine1}
				addressLine2={addressLine2}
				phone={phone}
				residence={residence}
				actions={actions}
				addressState={addressState}
			/>,
			<UpgradeStep3
				secretQuestion={secretQuestion}
				secretAnswer={secretAnswer}
				actions={actions}
				error={error}
			/>,
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
