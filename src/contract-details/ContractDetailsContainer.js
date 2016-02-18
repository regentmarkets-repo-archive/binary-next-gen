import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import portfolioSelectors from '../portfolio/PortfolioSelectors';
import ContractDetailsCard from './ContractDetailsCard';

@connect(portfolioSelectors)
export default class ContractDetailsContainer extends Component {

	static propTypes = {
		contracts: PropTypes.array,
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
		const { params, contracts } = this.props;
		const contract = contracts.find(x => x.contract_id === params.id);
		// const soldResultShown = portfolio.get('soldResultShown');
		// const now = portfolio.get('now');

		if (!contract) return null;

		return (
			<ContractDetailsCard
				contract={contract}
				// nowEpoch={now}
				// soldResultShown={soldResultShown}
				{...this.props}
			/>
		);
	}
}
