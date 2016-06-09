import React, { PropTypes, Component } from 'react';
import PortfolioList from './PortfolioList';

export default class PortfolioCard extends Component {

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
			purchaseTotal,
			indicativeTotal,
		} = this.props;

		const { router } = this.context;

		const onViewDetails = contract =>
			actions
				.detailsForContract(contract.contract_id)
				.then(() => {
					if (compact) {
						router.push(`/contract/${contract.contract_id}`);
					}
				});
		return (
			<div className="portfolio-panel">
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
