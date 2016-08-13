import React, { PropTypes, PureComponent } from 'react';
import { showError } from 'binary-utils';
import EmptySlate from '../containers/EmptySlate';
import { actions } from '../_store';
import PortfolioList from './PortfolioList';

export default class PortfolioCard extends PureComponent {

	static propTypes = {
		compact: PropTypes.bool,
		contracts: PropTypes.object,
		proposals: PropTypes.object,
		purchaseTotal: PropTypes.number,
		indicativeTotal: PropTypes.number,
		history: PropTypes.object,
		onViewDetails: PropTypes.func,
	};

	static contextTypes = {
		router: PropTypes.object.isRequired,
	};

	onViewDetails = contract => {
		const { compact } = this.props;
		const { router } = this.context;

		actions
			.detailsForContract(contract.contract_id)
			.then(() => {
				if (compact) {
					router.push({
						pathname: '/contract',
						query: { id: contract.contract_id },
					});
				}
			})
			.catch(e => showError(e));
	}

	render() {
		const { compact, contracts, purchaseTotal, indicativeTotal } = this.props;

		return (
			<div className="portfolio-card">
				{Object.keys(contracts).length === 0 ?
					<EmptySlate
						img="img/portfolio.svg"
						text="You have no open contracts"
					/> :
					<PortfolioList
						compact={compact}
						contracts={contracts}
						purchaseTotal={purchaseTotal}
						indicativeTotal={indicativeTotal}
						onViewDetails={this.onViewDetails}
					/>
				}
			</div>
		);
	}
}
