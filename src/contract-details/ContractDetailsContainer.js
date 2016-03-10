import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { immutableChildrenToJS } from '../_utils/ObjectUtils';
import portfolioSelectors from '../portfolio/PortfolioSelectors';
import ContractDetailsCard from './ContractDetailsCard';

@connect(portfolioSelectors)
export default class ContractDetailsContainer extends Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		contracts: PropTypes.object.isRequired,
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
		const contract = contracts.find(x => x.get('contract_id') === params.id);

		const ticks = contract.get('symbol');
		// const soldResultShown = portfolio.get('soldResultShown');
		// const now = portfolio.get('now');
		if (!contract) return null;

		return (
			<ContractDetailsCard
				contract={contract.toJS()}
				ticks={ticks.toJS()}
				// nowEpoch={now}
				// soldResultShown={soldResultShown}
				{...immutableChildrenToJS(this.props)}
			/>
		);
	}
}
