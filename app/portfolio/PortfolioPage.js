import React from 'react';
import { LiveData } from 'binary-live-api';
import Modal from '../common/Modal';
import PortfolioTable from './PortfolioTable';
import PortfolioDetails from './PortfolioDetails';

export default class PortfolioPage extends React.Component {

	constructor(props) {
		super(props);

		const liveData = new LiveData('2BpkX3lNIkuKH5VLIQqDHTJWNsYgOBTEBL85u9iMszP4RqHLGd5SM1Jt1TgqssbFNdHAi3cTgO6ubLuHYa1iXm77l7G5q4EMU50vjU85YRJF4VqcOYzFLDqieWEOsc7y')

		this.state = {
			detailsShown: false,
			contractDetails: {},
			contracts: [],
			totals: {}
		};

		liveData.api.getPortfolio();

		liveData.onDataChange = (function(data) {
			this.setState({
				contracts: liveData.contracts,
				totals: {
					purchase: liveData.contracts.length && liveData.contracts.reduce((x, y) => x + +y.buy_price, 0),
					indicative: liveData.contracts.length && liveData.contracts.reduce((x, y) => x + +y.buy_price, 0),
				}
			});
		}).bind(this);
	}

	showDetails(contract) {
		this.setState({ contractDetails: contract, detailsShown: true });
	}

	onCloseDetails() {
		this.setState({ detailsShown: false });
	}

	render() {

		return (
			<div>
				<h3>Account balance : USD 9,822.07</h3>
				<Modal shown={this.state.detailsShown} onClose={::this.onCloseDetails}>
					<PortfolioDetails contract={this.state.contractDetails} />
				</Modal>
				<PortfolioTable contracts={this.state.contracts} totals={this.state.totals} onViewDetails={::this.showDetails} />
			</div>
		);
	}
}
