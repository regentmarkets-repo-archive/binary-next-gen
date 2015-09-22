import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PortfolioActions from '../_actions/PortfolioActions';
import Modal from '../common/Modal';
import PortfolioTable from './PortfolioTable';
import ContractDetails from './ContractDetails';

@connect(state => ({ account: state.serverData.account, portfolio: state.portfolio }))
export default class PortfolioPage extends React.Component {

	static propTypes = {
		account: React.PropTypes.object.isRequired,
		portfolio: React.PropTypes.object,
		dispatch: React.PropTypes.func,
	};

	showDetails(contract) {
		const actions = bindActionCreators(PortfolioActions, this.props.dispatch);
		actions.detailsForContract(true, contract);
	}

	onCloseDetails() {
		const actions = bindActionCreators(PortfolioActions, this.props.dispatch);
		actions.detailsForContract(false);
	}

	render() {
		const { contracts, contractShown, areDetailsShown } = this.props.portfolio.toJS();
		const { balance } = this.props.account;
		const balanceStr = balance && balance.amount && `${balance.currency} ${balance.amount.toFixed(2)}`;
		window.console.log(this.props);
		return (
			<div>
				<h3>Account balance: {balanceStr} </h3>
				<Modal shown={areDetailsShown} onClose={::this.onCloseDetails}>
					<ContractDetails contract={contractShown} />
				</Modal>
				<PortfolioTable
					contracts={contracts}
					onViewDetails={::this.showDetails} />
			</div>
		);
	}
}
