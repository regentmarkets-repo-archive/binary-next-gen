import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { BinaryChart } from 'binary-charts';
import M from '../_common/M';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';
import ContractDetailsSelectors from './ContractDetailsSelectors';
import ContractDetailsCard from './ContractDetailsCard';

@connect(ContractDetailsSelectors)
export default class ContractDetailsContainer extends Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		contract: PropTypes.object.isRequired,
		ticks: PropTypes.array,
		params: PropTypes.object,
		pipSize: PropTypes.number,
		actions: PropTypes.object.isRequired,
	};

	componentWillMount() {
		const { actions, ticks } = this.props;
		const contract = this.props.contract.toJS();

		if (!ticks) {
			actions.getDataForContract(contract.contract_id, 'all');
		}
	}

	render() {
		const { actions } = this.props;
		const contract = this.props.contract.toJS();

		if (!contract) return null;

		return (
			<div className="contract-details">
				<h6>
					{contract.longcode}
					<div>
						<M m="Transaction Reference" />: {contract.transaction_id}
					</div>
				</h6>
				<p></p>
				<BinaryChart
					{...immutableChildrenToJS(this.props)}
                    className="trade-chart"
					rangeChange={(count, type) => actions.getDataForContract(contract.contract_id, count, type)}
				/>
				<ContractDetailsCard
					{...immutableChildrenToJS(this.props)}
				/>
		</div>
		);
	}
}
