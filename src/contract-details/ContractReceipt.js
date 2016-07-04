import React, { PropTypes, Component } from 'react';
import Button from 'binary-components/lib/Button';
import { actions } from '../_store';
import ContractDetailsList from './ContractDetailsList';
import SellAtMarketButton from './SellAtMarketButton';
import ContractValidationError from './ContractValidationError';
import ContractWinLose from './ContractWinLose';

export default class ContractReceipt extends Component {

	static propTypes = {
		contract: PropTypes.object.isRequired,
		onTradeAgainClicked: PropTypes.func,
		showLongcode: PropTypes.bool,
	};

	sellAtMarket = () => {
		const { contract } = this.props;
		actions.sellContract(contract.contract_id, 0);
	}

	render() {
		const { contract, showLongcode, onTradeAgainClicked } = this.props;

		return (
			<div className="contract-receipt">
				{showLongcode && <h5>{contract.longcode}</h5>}
				<ContractWinLose contract={contract} />
				<ContractDetailsList contract={contract} />
				<SellAtMarketButton
					contract={contract}
					onClick={this.sellAtMarket}
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
