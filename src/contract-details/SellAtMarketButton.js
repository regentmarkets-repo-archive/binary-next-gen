import React, { PropTypes, PureComponent } from 'react';
import { actions } from '../_store';
import M from 'binary-components/lib/M';
import NumberPlain from 'binary-components/lib/NumberPlain';

export default class SellAtMarketButton extends PureComponent {

	static propTypes = {
		contract: PropTypes.object.isRequired,
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
						isProfit={v => v - contract.buy_price}
					/>
				}
			</button>
		);
	}
}
