import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';
import ContractDetailsSelectors from './ContractDetailsSelectors';
import ContractDetailsCard from './ContractDetailsCard';

@connect(ContractDetailsSelectors)
export default class ContractDetailsContainer extends Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static defaultProps = {
		chartData: {},
	};

	static propTypes = {
		contract: PropTypes.object.isRequired,
		chartData: PropTypes.shape({
			ticks: PropTypes.array,
			candles: PropTypes.array,
		}),
		params: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired,
	};

	componentWillMount() {
		const { actions, chartData, contract, params } = this.props;
		const { ticks } = chartData;

		if (!contract) {
			actions.subscribeToOpenContract(params.id);
			return;
		}

		if (!ticks) {
			actions.getDataForContract(contract.get('contract_id'), 1, 'all', 'ticks');
		}
	}

	render() {
		if (!this.props.contract) {
			return null;
		}
		return (
			<ContractDetailsCard
				{...immutableChildrenToJS(this.props)}
			/>
		);
	}
}
