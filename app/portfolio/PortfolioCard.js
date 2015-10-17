import React from 'react';
import { bindActionCreators } from 'redux';
import * as PortfolioActions from '../_actions/PortfolioActions';
import Modal from '../common/Modal';
import PortfolioTable from './PortfolioTable';
import ContractDetails from './ContractDetails';


const PortfolioCard = ({compact, portfolio, dispatch}) => {
	const showDetails = (contract) => {
		const actions = bindActionCreators(PortfolioActions, dispatch);
		actions.detailsForContract(true, contract);
	};

	const onCloseDetails = () => {
		const actions = bindActionCreators(PortfolioActions, dispatch);
		actions.detailsForContract(false);
	};

	const { contracts, contractShown, areDetailsShown } = portfolio.toJS();
	return (
		<div>
			<Modal shown={areDetailsShown} onClose={onCloseDetails}>
				<ContractDetails contract={contractShown} />
			</Modal>
			<PortfolioTable
				compact={compact}
				contracts={contracts}
				onViewDetails={showDetails} />
		</div>
	);
};

PortfolioCard.propTypes = {
	compact: React.PropTypes.bool,
	portfolio: React.PropTypes.object,
	dispatch: React.PropTypes.func,
};

export default PortfolioCard;
