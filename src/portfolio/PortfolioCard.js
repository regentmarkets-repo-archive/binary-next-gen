import React, { PropTypes } from 'react';
import PortfolioTable from './PortfolioTable';
import Modal from '../_common/Modal';
import ContractDetailsContainer from '../contract-details/ContractDetailsContainer';

export default class PortfolioCard extends React.Component {
	static propTypes = {
		compact: PropTypes.bool,
		portfolio: PropTypes.object,
		contracts: PropTypes.array,
		proposals: PropTypes.object,
		purchaseTotal: PropTypes.number,
		indicativeTotal: PropTypes.number,
		history: PropTypes.object,
		onViewDetails: PropTypes.func,
		actions: PropTypes.object,
	};

	render() {
		const {
			compact,
			history,
			actions,
			contracts,
			portfolio,
			purchaseTotal,
			indicativeTotal,
		} = this.props;
		const onViewDetails = contract =>
			compact
				? history.push(`/contract/${contract.contract_id}`)
				: actions.detailsForContract(true, contract);

		return (
			<div>
				<Modal
					shown={portfolio && portfolio.areDetailsShown}
					onClose={() => actions.detailsForContract(false, undefined)}
				>
					{portfolio.contractShown &&
					<ContractDetailsContainer actions={actions} params={{ id: portfolio.contractShown.contract_id }}/>}
				</Modal>
				<PortfolioTable
					compact={compact}
					contracts={contracts}
					purchaseTotal={purchaseTotal}
					indicativeTotal={indicativeTotal}
					onViewDetails={onViewDetails}
				/>
			</div>
		);
	}
}
