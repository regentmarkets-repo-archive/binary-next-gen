import React from 'react';
import { LiveData } from 'binary-live-api';
import Modal from '../common/Modal';
import PortfolioTable from './PortfolioTable';
import PortfolioDetails from './PortfolioDetails';

export default class PortfolioPage extends React.Component {

	constructor(props) {
		super(props);

		const liveData = new LiveData('QXECUwoEbNhYVxZeQ7yoWoaQXceQXdaNULXn8oEdJtPyR7IYfcksvr3UQ8QbcfmgE6hWTlcZMTpfRAk1LHhfPYR5JeB2cd7PeylriQcgt2wnvA6EfblXP8yXpVVYzVpA')

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
