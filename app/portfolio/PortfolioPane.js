import React from 'react';
import { bindActionCreators } from 'redux';
import * as PortfolioActions from '../_actions/PortfolioActions';
import Modal from '../common/Modal';
import PortfolioTable from './PortfolioTable';
import ContractDetails from './ContractDetails';


const PortfolioPane = (props) => {
	const showDetails = (contract) => {
		const actions = bindActionCreators(PortfolioActions, props.dispatch);
		actions.detailsForContract(true, contract);
	};

	const onCloseDetails = () => {
		const actions = bindActionCreators(PortfolioActions, props.dispatch);
		actions.detailsForContract(false);
	};

	const { contracts, contractShown, areDetailsShown } = props.portfolio.toJS();
	const balance = props.account.toJS().balance;
	const balanceStr = balance && balance.amount && `${balance.currency} ${balance.amount.toFixed(2)}`;
	return (
		<div>
			<h3>Account balance: {balanceStr} </h3>
			<Modal shown={areDetailsShown} onClose={onCloseDetails}>
				<ContractDetails contract={contractShown} />
			</Modal>
			<PortfolioTable
				contracts={contracts}
				onViewDetails={showDetails} />
		</div>
	);
};

PortfolioPane.propTypes = {
	account: React.PropTypes.object.isRequired,
	portfolio: React.PropTypes.object,
	dispatch: React.PropTypes.func,
};

export default PortfolioPane;
