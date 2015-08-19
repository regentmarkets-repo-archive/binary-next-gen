import React from 'react';
import LiveData from '../_data/LiveData';
import Modal from '../common/Modal';
import StatementTable from './StatementTable';
import ContractDetails from '../portfolio/ContractDetails';

export default class StatenentPage extends React.Component {

	constructor(props) {
		super(props);

		const liveData = new LiveData();

		this.state = {
			detailsShown: false,
			contractDetails: {},
			contracts: [],
			totals: {},
		};

		liveData.api.getPortfolio();

		liveData.onDataChange = (dataType) => {
			if (dataType !== 'portfolio') return;

			this.setState({
				contracts: liveData.portfolio,
				totals: {
					purchase: liveData.portfolio.length && liveData.portfolio.reduce((x, y) => x + +y.buy_price, 0),
					indicative: liveData.portfolio.length && liveData.portfolio.reduce((x, y) => x + +y.buy_price, 0),
				},
			});
		};
	}

	showDetails(contract) {
		this.setState({ contractDetails: contract, detailsShown: true });
	}

	onCloseDetails() {
		this.setState({ detailsShown: false });
	}

	render() {
		const { detailsShown, contractDetails, contracts, totals } = this.state;

		return (
			<div>
				<Modal shown={detailsShown} onClose={::this.onCloseDetails}>
					<ContractDetails contract={contractDetails} />
				</Modal>
				<StatementTable contracts={contracts} totals={totals} onViewDetails={::this.showDetails} />
			</div>
		);
	}
}
