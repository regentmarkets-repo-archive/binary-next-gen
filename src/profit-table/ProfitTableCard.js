import React from 'react';
import { bindActionCreators } from 'redux';
import * as PortfolioActions from '../_actions/PortfolioActions';
import { Modal } from '../_common';
import ProfitTable from './ProfitTable';
import ContractDetailsCard from '../contract-details/ContractDetailsCard';

const ProfitTableCard = (props) => {
	const showDetails = contract => {
		const actions = bindActionCreators(PortfolioActions, props.dispatch);
		actions.detailsForContract(true, contract);
	};

	const onCloseDetails = () => {
		const actions = bindActionCreators(PortfolioActions, props.dispatch);
		actions.detailsForContract(false);
	};

	const { contractShown, compact, areDetailsShown, profitTable } = props;
	return (
		<div>
			<Modal shown={areDetailsShown} onClose={onCloseDetails}>
				<ContractDetailsCard contract={contractShown} />
			</Modal>
			<ProfitTable
				compact={compact}
				transactions={profitTable}
				onViewDetails={showDetails} />
		</div>
	);
};

ProfitTableCard.propTypes = {
	compact: React.PropTypes.bool,
	profitTable: React.PropTypes.object,
	dispatch: React.PropTypes.func,
	contractShown: React.PropTypes.object,
	areDetailsShown: React.PropTypes.bool,
};

export default ProfitTableCard;
