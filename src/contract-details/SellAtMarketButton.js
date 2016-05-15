import React, { PropTypes, Component } from 'react';
import M from '../_common/M';
import NumberPlain from '../_common/NumberPlain';

export default class ContractDetailsCard extends Component {

	static propTypes = {
		contract: PropTypes.object.isRequired,
		onClick: PropTypes.func.isRequired,
	};

	render() {
		const { contract, onClick } = this.props;
		const validToSell = contract.is_valid_to_sell === 1 && !contract.is_expired;

		return (
			<button
				className="sell-at-market-btn"
				disabled={contract.selling || !validToSell}
				onClick={onClick}
			>
				<M m="Sell at Market" />
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
