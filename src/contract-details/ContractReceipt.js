import React, { PropTypes, Component } from 'react';
import { BinaryChart } from 'binary-charts';
import ContractDetailsList from './ContractDetailsList';
import SellAtMarketButton from './SellAtMarketButton';
import ContractValidationError from './ContractValidationError';
import ContractWinLose from './ContractWinLose';

export default class ContractDetailsCard extends Component {

	static propTypes = {
		contract: PropTypes.object.isRequired,
		actions: PropTypes.object,
	};

	render() {
		const { contract, actions } = this.props;

		return (
			<div className="contract-details">
				<h6>{contract.longcode}</h6>
				<div className="trade-panel-receipt">
					<ContractDetailsList contract={contract} />
					<SellAtMarketButton
						contract={contract}
						onClick={() => actions.sellContract(contract.contract_id, 0)}
					/>
					<ContractValidationError contract={contract} />
					<ContractWinLose contract={contract} />
				</div>
				<BinaryChart
					{...this.props}
                    className="trade-chart"
					rangeChange={(count, type) => actions.getDataForContract(contract.contract_id, count, type)}
				/>
			</div>
		);
	}
}
