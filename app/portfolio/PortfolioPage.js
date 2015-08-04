import React from 'react';
import { LiveData } from 'binary-live-api';
import Modal from '../common/Modal';
import PortfolioTable from './PortfolioTable';
import PortfolioDetails from './PortfolioDetails';

export default class PortfolioPage extends React.Component {

	constructor(props) {
		super(props);

		const liveData = new LiveData('fcR6ZySPS3u0ezqOEt0bCZqpAuvXejg0vRUtulSAaCDISBPlrWtjOiIK1u8ZhGf0D8fJVWi4Zepb35jwAD6IpE7JF3gyFpT0BD6aH8Q7xIhb4FNKqasHWySW1pRJBI7T')

		this.state = {
			balance: {},
			detailsShown: false,
			contractDetails: {},
			contracts: [],
			totals: {}
		};

		liveData.api.getPortfolio();

		liveData.onDataChange = (function(dataType) {
			if (dataType != 'portfolio') return;

			this.setState({
				balance: liveData.balance,
				contracts: liveData.portfolio,
				totals: {
					purchase: liveData.portfolio.length && liveData.portfolio.reduce((x, y) => x + +y.buy_price, 0),
					indicative: liveData.portfolio.length && liveData.portfolio.reduce((x, y) => x + +y.buy_price, 0),
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
				<h3>Account balance : {this.state.balance.currency} {this.state.balance.amount}</h3>
				<Modal shown={this.state.detailsShown} onClose={::this.onCloseDetails}>
					<PortfolioDetails contract={this.state.contractDetails} />
				</Modal>
				<PortfolioTable contracts={this.state.contracts} totals={this.state.totals} onViewDetails={::this.showDetails} />
			</div>
		);
	}
}
