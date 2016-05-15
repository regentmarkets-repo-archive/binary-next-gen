import React, { PropTypes, Component } from 'react';
import toMoney from 'binary-utils/lib/toMoney';
import M from '../_common/M';
import NumberColored from '../_common/NumberColored';

export default class ContractWinLose extends Component {

	static propTypes = {
		contract: PropTypes.object.isRequired,
	};

	render() {
		const { contract } = this.props;
		const sold = !!contract.sell_price;
		const profit = sold && toMoney(contract.sell_price - contract.buy_price);

		if (!sold) return null;

		return (
			<div className="profit-loss-label">
				{profit >= 0 ? <M m="You won " /> : <M m="You lost " />}
				{profit >= 0 ?
					<NumberColored
						value={profit}
						currency={contract.currency}
						isProfit={v => v}
					/> :
					<NumberColored
						value={-profit}
						currency={contract.currency}
						isProfit={v => -v}
					/>
				}
			</div>
		);
	}
}
