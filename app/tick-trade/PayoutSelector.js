import React from 'react';
import { RadioGroup, CurrencySelector } from '../common';

const basisTypes = [
	{ value: 'payout', text: 'Payout' },
	{ value: 'stake', text: 'Stake' },
];

const payoutAmounts = [1, 2, 5, 10, 20, 50, 100, 500, 1000, 5000, 10000, 100000].map(x => ({ value: x, text: x }));

export default class TickTradeCard extends React.Component {

	static propTypes = {
		basis: React.PropTypes.string.isRequired,
		currency: React.PropTypes.string.isRequired,
		amount: React.PropTypes.number.isRequired,
		onChange: React.PropTypes.func.isRequired,
	};

	render() {
		const {amount, basis, currency} = this.props;
		return (
			<div>
				<RadioGroup options={basisTypes} value={basis} {...this.props}/>
				<CurrencySelector value={currency} />
				<RadioGroup value={amount} options={payoutAmounts} {...this.props}/>
				<input type="number" min={1} max={100000} />
			</div>
		);
	}
}
