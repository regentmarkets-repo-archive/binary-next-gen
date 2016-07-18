import React, { PropTypes, PureComponent } from 'react';
import P from 'binary-components/lib/P';
import { actions } from '../_store';
import PortfolioList from './PortfolioList';
import showError from 'binary-utils/lib/showError';

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
					router.push(`/contract/${contract.contract_id}`);
				}
			})
			.catch(e => showError(e));
	}

	render() {
		const { compact, contracts, purchaseTotal, indicativeTotal } = this.props;

		return (
			<div className="portfolio-card">
				{Object.keys(contracts).length === 0 ?
					<P className="notice-msg" text="You have no open contracts" /> :
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
