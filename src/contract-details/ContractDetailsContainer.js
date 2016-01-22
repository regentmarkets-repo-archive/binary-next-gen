import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import portfolioSelectors from '../_selectors/PortfolioSelectors';
import ContractDetailsCard from './ContractDetailsCard';

@connect(portfolioSelectors)
export default class ContractDetailsContainer extends React.Component {

	static propTypes = {
		contracts: PropTypes.object,
		proposals: PropTypes.object,
		portfolio: PropTypes.object,
		params: PropTypes.object,
		actions: PropTypes.object.isRequired,
	};

	componentDidMount() {
		this.interval = setInterval(this.props.actions.updateNow, 1000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		const { params, contracts, proposals } = this.props;
		const contract = contracts.find(x => x.contract_id === params.id);
		const proposal = proposals.get(params.id);
		// const soldResultShown = portfolio.get('soldResultShown');
		// const now = portfolio.get('now');

		if (!contract) return null;

		return (
			<ContractDetailsCard
				contract={contract}
				proposal={proposal}
				// nowEpoch={now}
				// soldResultShown={soldResultShown}
				{...this.props}
			/>
		);
	}
}
