import React, { PureComponent } from 'react';
import { M, NumberPlain } from 'binary-components';
import { actions } from '../_store';

export default class SellAtMarketButton extends PureComponent {

	props: {
		contract: Contract,
	};

	sellAtMarket = () => {
		const { contract } = this.props;
		actions.sellContract(contract.contract_id, 0);
	}

	render() {
		const { contract } = this.props;
		const validToSell = contract.is_valid_to_sell === 1 && !contract.is_expired;

		if (contract.selling || !validToSell) return null;

		return (
			<button
				className="sell-at-market-btn"
				onClick={this.sellAtMarket}
			>
				<M m="Sell at Market" />
				&nbsp;
				{validToSell &&
					<NumberPlain
						value={contract.bid_price}
						currency={contract.currency}
						digits={contract.fractionalDigits}
						isProfit={v => v - contract.buy_price}
					/>
				}
			</button>
		);
	}
}
