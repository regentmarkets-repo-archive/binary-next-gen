import React, { PropTypes, Component } from 'react';
import { BinaryChart } from 'binary-charts';
import ContractDetailsReceipt from './ContractDetailsReceipt';

export default class ContractDetailsCard extends Component {
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
