import React, { PropTypes } from 'react';
import PortfolioList from './PortfolioList';
import Modal from '../containers/Modal';
import ContractDetailsContainer from '../contract-details/ContractDetailsContainer';

export default class PortfolioCard extends React.Component {

	static propTypes = {
		compact: PropTypes.bool,
		portfolio: PropTypes.object,
		contracts: PropTypes.object,
		proposals: PropTypes.object,
		purchaseTotal: PropTypes.number,
		indicativeTotal: PropTypes.number,
		history: PropTypes.object,
		onViewDetails: PropTypes.func,
		actions: PropTypes.object,
	};

	static contextTypes = {
		router: React.PropTypes.object.isRequired,
	};

	render() {
		const {
			compact,
			actions,
			contracts,
			portfolio,
			purchaseTotal,
			indicativeTotal,
		} = this.props;

		const { router } = this.context;

		const onViewDetails = contract =>
			compact
				? router.push(`/contract/${contract.contract_id}`)
				: actions.detailsForContract(true, contract);

		return (
			<div>
				<Modal
					shown={portfolio && portfolio.areDetailsShown}
					onClose={() => actions.detailsForContract(false, undefined)}
				>
					{portfolio.contractShown &&
						<ContractDetailsContainer
							actions={actions}
							params={{ id: portfolio.contractShown.contract_id }}
						/>
					}
				</Modal>
				<PortfolioList
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
