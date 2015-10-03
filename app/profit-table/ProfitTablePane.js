import React from 'react';
import { bindActionCreators } from 'redux';
import * as PortfolioActions from '../_actions/PortfolioActions';
import { Modal } from '../common';
import ProfitTable from './ProfitTable';
import ContractDetails from './ContractDetails';

const ProfitTablePane = (props) => {
	const showDetails = (contract) => {
		const actions = bindActionCreators(PortfolioActions, props.dispatch);
		actions.detailsForContract(true, contract);
	};

	const onCloseDetails = () => {
		const actions = bindActionCreators(PortfolioActions, props.dispatch);
		actions.detailsForContract(false);
	};

	const { contracts, contractShown, areDetailsShown } = props.profitTable; // props.profitTable.toJS();
	return (
		<div>
			<Modal shown={areDetailsShown} onClose={onCloseDetails}>
				<ContractDetails contract={contractShown} />
			</Modal>
			<ProfitTable
				contracts={contracts}
				onViewDetails={showDetails} />
		</div>
	);
};

ProfitTablePane.propTypes = {
	profitTable: React.PropTypes.object,
	dispatch: React.PropTypes.func,
};

export default ProfitTablePane;
