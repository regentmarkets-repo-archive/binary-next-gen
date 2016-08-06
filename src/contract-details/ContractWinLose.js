import React, { PropTypes, PureComponent } from 'react';
import { toMoney } from 'binary-utils';
import { M, NumberColored } from 'binary-components';

export default class ContractWinLose extends PureComponent {

	static propTypes = {
		contract: PropTypes.object.isRequired,
	};

	render() {
		const { contract } = this.props;
		const sold = !!contract.sell_price;
		const profit = sold && toMoney(contract.sell_price - contract.buy_price);

		if (!sold) return null;

		return (
			<div className="profit-loss-label notice-msg">
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
