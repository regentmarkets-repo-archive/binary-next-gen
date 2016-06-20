import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';
import contractDetailsSelectors from './ContractDetailsSelectors';
import ContractDetailsCard from './ContractDetailsCard';

@connect(contractDetailsSelectors)
export default class ContractDetailsContainer extends Component {

	static defaultProps = {
		chartData: {},
	};

	static propTypes = {
		contract: PropTypes.object.isRequired,
		chartData: PropTypes.shape({
			ticks: PropTypes.array,
			candles: PropTypes.array,
		}),
		actions: PropTypes.object.isRequired,
	};

	componentWillMount() {
		const { actions, chartData, contract } = this.props;
		const { ticks } = chartData;

		if (!ticks) {
			actions.getDataForContract(contract.get('contract_id'), 1, 'all', 'ticks');
		}
	}

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		return (
			<ContractDetailsCard
				{...immutableChildrenToJS(this.props)}
			/>
		);
	}
}
