import React, { PropTypes, PureComponent } from 'react';
import { Button } from 'binary-components';
import ContractDetailsList from './ContractDetailsList';
import ContractWinLose from './ContractWinLose';
import SellAtMarketButton from './SellAtMarketButton';
import ContractValidationError from './ContractValidationError';

const openContractSubscriptionFailed = contract =>
	contract.validation_error && Object.keys(contract).length < 3;

export default class ContractReceipt extends PureComponent {

	static propTypes = {
		contract: PropTypes.object.isRequired,
		onTradeAgainClicked: PropTypes.func,
		showLongcode: PropTypes.bool,
	};

	render() {
		const { contract, showLongcode, onTradeAgainClicked } = this.props;
		const backendFailure = openContractSubscriptionFailed(contract);

		return (backendFailure ?
			<div className="contract-receipt">
				<ContractValidationError contract={contract} />
				{onTradeAgainClicked &&
				<Button
					className="buy-again-btn"
					text="Trade Again"
					onClick={onTradeAgainClicked}
				/>}
			</div> :
			<div className="contract-receipt">
				{showLongcode && <h5>{contract.longcode}</h5>}
				<ContractDetailsList contract={contract} />
				<ContractWinLose contract={contract} />
				<SellAtMarketButton contract={contract} />
				<ContractValidationError contract={contract} />
				{onTradeAgainClicked &&
					<Button
						className="buy-again-btn"
						text="Trade Again"
						onClick={onTradeAgainClicked}
					/>}
			</div>
		);
	}
}
