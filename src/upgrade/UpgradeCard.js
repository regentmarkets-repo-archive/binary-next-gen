import React from 'react';
import { LogoSpinner, M } from '../_common';
import UpgradeStep1 from './UpgradeStep1';
import UpgradeStep2 from './UpgradeStep2';
import UpgradeStep3 from './UpgradeStep3';

export default class UpgradeCard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			progress: false,
			currentPage: 0,
		};
	}

	static propTypes = {
		upgrade: React.PropTypes.object.isRequired,
		actions: React.PropTypes.object.isRequired,
	};

	performSignup() {
	}

	nextStep(e) {
		e.preventDefault();
		this.setState({
			currentPage: this.state.currentPage + 1,
		});
	}

	openAccount(e) {
		e.preventDefault();
		this.setState({
			progress: true,
		});
		this.performSignup();
	}

	previousStep(e) {
		e.preventDefault();
		this.setState({
			currentPage: this.state.currentPage - 1,
		});
	}

	render() {
		const {
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
			/>,
		];

		return (
			<div className="wide-form" >
				<p className="media">
					<LogoSpinner spinning={this.state.progress}/>
				</p>
				<h3><M m="Upgrade to Real Money Account" /></h3>
				{ steps[this.props.upgrade.get('activeStep')] }
			</div>
		);
	}
}
