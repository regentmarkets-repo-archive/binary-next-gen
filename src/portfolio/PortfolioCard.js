import React, { PropTypes } from 'react';
import { Modal } from '../_common';
import PortfolioTable from './PortfolioTable';
import ContractDetailsCard from '../contract-details/ContractDetailsCard';

export default class PortfolioCard extends React.Component {
	static propTypes = {
		compact: PropTypes.bool,
		portfolio: PropTypes.object,
		history: PropTypes.object,
		onViewDetails: PropTypes.func,
		actions: PropTypes.object,
	};

	render() {
		const { compact, portfolio, history, actions } = this.props;
		const contractShown = portfolio.get('contractShown');
		const proposalShown = contractShown && portfolio.get('proposals').get(contractShown.contract_id);
		const onViewDetails = contract =>
			compact
				? history.push(`/contract/${contract.contract_id}`)
				: actions.detailsForContract(true, contract);
		return (
			<div>
				<Modal
					shown={portfolio.get('areDetailsShown')}
					onClose={() => actions.detailsForContract(false)}
				>
					<ContractDetailsCard contract={contractShown} proposal={proposalShown} />
				</Modal>
				<PortfolioTable
					compact={compact}
					contracts={portfolio.get('contracts')}
					proposals={portfolio.get('proposals')}
					onViewDetails={onViewDetails}
				/>
			</div>
		);
	}
}
