import React, { PropTypes } from 'react';
import { RadioGroup, CurrencySelector, ErrorMsg } from '../_common';

const basisTypes = [
	{ value: 'payout', text: 'Payout' },
	{ value: 'stake', text: 'Stake' },
];

const payoutAmounts = [1, 2, 5, 10, 20, 50, 100, 500, 1000].map(x => ({ value: x, text: x }));

export default class PayoutSelectorCard extends React.Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		tickTrade: PropTypes.object.isRequired,
		onChange: PropTypes.func,
	};

	updateValue(val) {
		const { actions, onChange } = this.props;

		if (val.amount > 100000) {
			actions.updateTickTradeParameters({ amount: 100000 });
		} else {
			actions.updateTickTradeParameters(val);
		}

		if (onChange) onChange();
	}

	render() {
		const { tickTrade } = this.props;
		return (
			<div>
				<RadioGroup
					name="basis"
					options={basisTypes}
					value={tickTrade.get('basis')}
					onChange={e => this.updateValue({ basis: e.target.value })}
					{...this.props}
				/>
				<CurrencySelector
					radio
					value={tickTrade.get('currency')}
					onChange={e => this.updateValue({ currency: e.target.value })}
				/>
				<input
					type="number"
					min={1} max={100000}
					value={tickTrade.get('amount')}
					onChange={e => this.updateValue({ amount: e.target.value })}
				/>
				<ErrorMsg
					shown={tickTrade.get('amount') === 100000}
					text="Max value is 100,000"
				/>
				<RadioGroup
					name="amount"
					value={tickTrade.get('amount')}
					options={payoutAmounts}
					onChange={e => this.updateValue({ amount: e.target.value })}
					{...this.props}
				/>
			</div>
		);
	}
}
