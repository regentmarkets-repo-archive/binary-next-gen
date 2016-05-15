import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';
import ContractDetailsSelectors from './ContractDetailsSelectors';
import ContractDetailsCard from './ContractDetailsCard';

@connect(ContractDetailsSelectors)
export default class ContractDetailsContainer extends Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		contract: PropTypes.object.isRequired,
		ticks: PropTypes.array,
		actions: PropTypes.object.isRequired,
	};

	componentWillMount() {
		const { actions, ticks, contract } = this.props;

		if (!ticks) {
			actions.getDataForContract(contract.get('contract_id'), 'all');
		}
	}

	render() {
		return (
			<ContractDetailsCard
				{...immutableChildrenToJS(this.props)}
			/>
		);
	}
}
