import React from 'react';
import LiveData from '../_data/LiveData';
import Modal from '../common/Modal';
import PortfolioTable from './PortfolioTable';
import PortfolioDetails from './PortfolioDetails';

export default class PortfolioPage extends React.Component {

	constructor(props) {
		super(props);

		const liveData = new LiveData();

		this.state = {
			balance: null,
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
		console.log(contract);
		this.setState({ contractDetails: contract, detailsShown: true });
	}

	onCloseDetails() {
		this.setState({ detailsShown: false });
	}

	render() {

		const { balance, detailsShown, contractDetails, contracts, totals } = this.state;
		const balanceStr = balance ? `${balance.currency} ${balance.amount.toFixed(2)}` : '';

		return (
			<div>
				<h3>Account balance: {balanceStr} </h3>
				<Modal shown={detailsShown} onClose={::this.onCloseDetails}>
					<PortfolioDetails contract={contractDetails} />
				</Modal>
				<PortfolioTable contracts={contracts} totals={totals} onViewDetails={::this.showDetails} />
			</div>
		);
	}
}
