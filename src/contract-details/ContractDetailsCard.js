import React, { PropTypes, Component } from 'react';
import { BinaryChart } from 'binary-charts';
import ContractDetailsReceipt from './ContractDetailsReceipt';

export default class ContractDetailsCard extends Component {

	static propTypes = {
		contract: PropTypes.object.isRequired,
		actions: PropTypes.object,
	};

	render() {
		const { contract, actions } = this.props;

		return (
			<div className="contract-details">
				<BinaryChart
					{...this.props}
                    className="trade-chart"
					rangeChange={(count, type) =>
						actions.getDataForContract(contract.contract_id, count, type)
					}
				/>
				<ContractDetailsReceipt contract={contract} />
			</div>
		);
	}
}
