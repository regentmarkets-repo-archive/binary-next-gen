import React, { PureComponent } from 'react';
import { directionClassName } from 'binary-utils';
import { M, NumberPlain } from 'binary-components';

export default class ContractWinLose extends PureComponent {

	props: {
		contract: Contract,
	};

	render() {
		const { contract } = this.props;
		const sold = !!contract.sell_price;
		const fractionalDigits = contract.fractionalDigits || 2;
		const profit = sold && (contract.sell_price - contract.buy_price).toFixed(fractionalDigits);

		if (!sold) return null;
		const className = directionClassName(profit);
		return (
			<div className="profit-loss-label notice-msg">
				{profit >= 0 ? <M m="You Won " /> : <M m="You Lost " />}
				<NumberPlain
					className={className}
					value={Math.abs(profit)}
					currency={contract.currency}
					digits={contract.fractionalDigits}
				/>
			</div>
		);
	}
}
