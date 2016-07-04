import React, { PropTypes, Component } from 'react';
import Button from 'binary-components/lib/Button';
import ContractDetailsList from './ContractDetailsList';
import ContractWinLose from './ContractWinLose';
import SellAtMarketButton from './SellAtMarketButton';
import ContractValidationError from './ContractValidationError';

export default class ContractReceipt extends Component {

	static propTypes = {
		contract: PropTypes.object.isRequired,
		onTradeAgainClicked: PropTypes.func,
		showLongcode: PropTypes.bool,
	};

	render() {
		const { contract, showLongcode, onTradeAgainClicked } = this.props;

		return (
			<div className="contract-receipt">
				{showLongcode && <h5>{contract.longcode}</h5>}
				<ContractWinLose contract={contract} />
				<ContractDetailsList contract={contract} />
				<SellAtMarketButton
					contract={contract}
				/>
				<ContractValidationError contract={contract} />
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
