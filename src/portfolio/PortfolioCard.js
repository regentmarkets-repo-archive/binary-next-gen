import React, { PropTypes } from 'react';
import PortfolioTable from './PortfolioTable';

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

	render() {
		const { compact, history, actions, contracts, proposals, purchaseTotal, indicativeTotal } = this.props;
		const onViewDetails = contract =>
			compact
				? history.push(`/contract/${contract.contract_id}`)
				: actions.detailsForContract(true, contract);

		return (
			<PortfolioTable
				compact={compact}
				contracts={contracts}
				proposals={proposals}
				purchaseTotal={purchaseTotal}
				indicativeTotal={indicativeTotal}
				onViewDetails={onViewDetails}
			/>
		);
	}
}
