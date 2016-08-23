import React, { PropTypes, PureComponent } from 'react';
import { toMoney, directionClassName } from 'binary-utils';
import { M, NumberPlain } from 'binary-components';

export default class ContractWinLose extends PureComponent {

	static propTypes = {
		contract: PropTypes.object.isRequired,
	};

	render() {
		const { contract } = this.props;
		const sold = !!contract.sell_price;
		const profit = sold && toMoney(contract.sell_price - contract.buy_price);

		if (!sold) return null;
		const className = directionClassName(profit);
		return (
			<div className="profit-loss-label notice-msg">
				{profit >= 0 ? <M m="You Won " /> : <M m="You Lost " />}
				<NumberPlain
					className={className}
					value={Math.abs(profit)}
					currency={contract.currency}
				/>
			</div>
		);
	}
}
