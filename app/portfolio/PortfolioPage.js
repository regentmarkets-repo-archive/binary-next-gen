import React from 'react';
import { connect } from 'react-redux';
import Modal from '../common/Modal';
import PortfolioTable from './PortfolioTable';
import ContractDetails from './ContractDetails';

@connect(state => ({ balance: state.serverData.balance, contracts: state.serverData.contracts }))
export default class PortfolioPage extends React.Component {

	static propTypes = {
		balance: React.PropTypes.object.isRequired,
		contracts: React.PropTypes.object.isRequired,
	};

	constructor(props) {
		super(props);

		this.state = {
			detailsShown: false,
			contractDetails: {},
		};
	}

	showDetails(contract) {
		this.setState({ contractDetails: contract, detailsShown: true });
	}

	onCloseDetails() {
		this.setState({ detailsShown: false });
	}

	render() {
		const { balance, contracts } = this.props;
		const { detailsShown, contractDetails } = this.state;
		const balanceStr = balance && balance.amount && `${balance.currency} ${balance.amount.toFixed(2)}`;
		const totals = {};

		return (
			<div>
				<h3>Account balance: {balanceStr} </h3>
				<Modal shown={detailsShown} onClose={::this.onCloseDetails}>
					<ContractDetails contract={contractDetails} />
				</Modal>
				<PortfolioTable
					contracts={contracts}
					totals={totals}
					onViewDetails={::this.showDetails} />
			</div>
		);
	}
}
