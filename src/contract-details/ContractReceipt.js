import React, { PropTypes, Component } from 'react';
import Button from 'binary-components/lib/Button';
import ContractDetailsList from './ContractDetailsList';
import SellAtMarketButton from './SellAtMarketButton';
import ContractValidationError from './ContractValidationError';
import ContractWinLose from './ContractWinLose';

export default class ContractReceipt extends Component {

	static propTypes = {
		contract: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired,
		onTradeAgainClicked: PropTypes.func,
		showLongcode: PropTypes.bool,
	};

	render() {
		const { contract, showLongcode, actions, onTradeAgainClicked } = this.props;

		return (
			<div className="contract-receipt">
				{showLongcode && <h5>{contract.longcode}</h5>}
				<ContractDetailsList contract={contract} />
				<SellAtMarketButton
					contract={contract}
					onClick={() => actions.sellContract(contract.contract_id, 0)}
				/>
				<ContractValidationError contract={contract} />
				<ContractWinLose contract={contract} />
				{onTradeAgainClicked &&
					<Button
						className="buy-again-btn"
						text="Trade Again"
						onClick={onTradeAgainClicked}
					/>
				}
			</div>
		);
	}
}
