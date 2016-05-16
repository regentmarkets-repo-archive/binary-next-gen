import React, { PropTypes, Component } from 'react';
import ContractDetailsList from './ContractDetailsList';
import SellAtMarketButton from './SellAtMarketButton';
import ContractValidationError from './ContractValidationError';
import ContractWinLose from './ContractWinLose';

export default class ContractDetailsReceipt extends Component {

	static propTypes = {
		contract: PropTypes.object.isRequired,
		actions: PropTypes.object,
	};

	render() {
		const { contract, actions } = this.props;

		return (
			<div className="contract-receipt">
				<h6>{contract.longcode}</h6>
				<ContractDetailsList contract={contract} />
				<SellAtMarketButton
					contract={contract}
					onClick={() => actions.sellContract(contract.contract_id, 0)}
				/>
				<ContractValidationError contract={contract} />
				<ContractWinLose contract={contract} />
			</div>
		);
	}
}
