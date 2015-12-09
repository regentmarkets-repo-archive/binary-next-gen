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
		const steps = [(
			<div>
				<UpgradeStep1 />
				<p>
					<button onClick={::this.nextStep}>
						<M m="Next" />
					</button>
				</p>
			</div>
		), (
			<div>
				<UpgradeStep2 />
				<p>
					<button onClick={::this.previousStep}>
						<M m="Back" />
					</button>
					<button onClick={::this.nextStep}>
						<M m="Next" />
					</button>
				</p>
			</div>
		), (
			<div>
				<UpgradeStep3 />
				<p>
					<button onClick={::this.previousStep}>
						<M m="Back" />
					</button>
					<button onClick={::this.openAccount}>
						<M m="Open Account" />
					</button>
				</p>
			</div>)];

		return (
			<div className="wide-form" >
				<p className="media">
					<LogoSpinner spinning={this.state.progress}/>
				</p>
				<h3><M m="Upgrade to Real Money Account" /></h3>
				{ steps[this.state.currentPage] }
			</div>
		);
	}
}
