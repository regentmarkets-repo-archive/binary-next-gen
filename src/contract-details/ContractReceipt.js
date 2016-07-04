import React, { PropTypes, Component } from 'react';
import ContractDetailsList from './ContractDetailsList';
import ContractWinLose from './ContractWinLose';

export default class ContractReceipt extends Component {

	static propTypes = {
		contract: PropTypes.object.isRequired,
		onTradeAgainClicked: PropTypes.func,
		showLongcode: PropTypes.bool,
	};

	render() {
		const { contract, showLongcode } = this.props;

		return (
			<div className="contract-receipt">
				{showLongcode && <h5>{contract.longcode}</h5>}
				<ContractWinLose contract={contract} />
				<ContractDetailsList contract={contract} />
			</div>
		);
	}
}
