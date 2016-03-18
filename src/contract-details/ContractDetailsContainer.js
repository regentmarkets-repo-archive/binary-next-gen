import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { BinaryChart } from 'binary-charts';
import M from '../_common/M';
import { immutableChildrenToJS } from '../_utils/ObjectUtils';
import portfolioSelectors from '../portfolio/PortfolioSelectors';
import ContractDetailsCard from './ContractDetailsCard';

@connect(portfolioSelectors)
export default class ContractDetailsContainer extends Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		contracts: PropTypes.object.isRequired,
		ticks: PropTypes.object.isRequired,
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
		const { params, contracts, ticks } = this.props;
		const contract = contracts.find(x => x.get('contract_id') === params.id).toJS();

		const history = ticks.get(contract.symbol).toJS();
		// const soldResultShown = portfolio.get('soldResultShown');
		// const now = portfolio.get('now');
		if (!contract) return null;
		// console.log(JSON.stringify(contract));
		return (
			<div className="contract-details">
				<h6>
					{contract.longcode}
					<M m="Trasaction Reference" />: {contract.transaction_id}
				</h6>
				<p></p>
				<BinaryChart
                    className="trade-chart"
                    ticks={history}
                    contract={contract}
				/>
				<ContractDetailsCard
					contract={contract}
					ticks={history}
					// soldResultShown={soldResultShown}
					{...immutableChildrenToJS(this.props)}
				/>
		</div>
		);
	}
}
