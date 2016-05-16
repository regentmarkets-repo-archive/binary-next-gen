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
	};

	render() {
		const { contract, actions } = this.props;
		console.log('rp');
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
