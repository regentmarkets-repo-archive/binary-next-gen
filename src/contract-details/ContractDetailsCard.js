import React, { PropTypes, Component } from 'react';
import { BinaryChart } from 'binary-charts';
import ContractDetailsReceipt from './ContractDetailsReceipt';
import debug from '../fulltrade/shallowEqualDebug';

export default class ContractDetailsCard extends Component {
	shouldComponentUpdate(p) {
		return !debug(p, this.props);
	}

	static propTypes = {
		contract: PropTypes.object.isRequired,
		actions: PropTypes.object,
		pipSize: PropTypes.number,
		ticks: PropTypes.array,
	};

	render() {
		const { contract, ticks, actions, pipSize } = this.props;
		return (
			<div className="contract-details">
				<BinaryChart
					contract={contract}
					ticks={ticks}
                    className="trade-chart"
					rangeChange={(count, type) =>
						actions.getDataForContract(contract.contract_id, count, type)
					}
					pipSize={pipSize}
				/>
				<ContractDetailsReceipt contract={contract} />
			</div>
		);
	}
}
