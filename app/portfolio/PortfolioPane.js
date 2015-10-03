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
	return (
		<div>
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
	portfolio: React.PropTypes.object,
	dispatch: React.PropTypes.func,
};

export default PortfolioPane;
