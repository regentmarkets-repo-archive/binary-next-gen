import React, { PropTypes } from 'react';
import { RadioGroup, CurrencyPicker, InputGroup } from '../_common';

const basisTypes = [
	{ value: 'payout', text: 'Payout' },
	{ value: 'stake', text: 'Stake' },
];

const payoutAmounts = [1, 2, 5, 10, 20, 50, 100, 500, 1000].map(x => ({ value: x, text: x }));
const maxAmount = 100000;
const minAmount = 1;
export default class PayoutPickerCard extends React.Component {
	static propTypes = {
		actions: PropTypes.object.isRequired,
		tickTrade: PropTypes.object.isRequired,
		onChange: PropTypes.func,
	};

	updateValue(val) {
		const { actions, onChange } = this.props;

		if (+val.amount > maxAmount) {
			actions.updateTickTradeParameters({ amount: maxAmount });
		} else if (+val.amount < minAmount) {
			actions.updateTickTradeParameters({ amount: minAmount });
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
				<CurrencyPicker
					radio
					value={tickTrade.get('currency')}
					onChange={e => this.updateValue({ currency: e.target.value })}
				/>
				<InputGroup
					type="number"
					min={minAmount} max={maxAmount}
					value={tickTrade.get('amount')}
					onChange={e => this.updateValue({ amount: e.target.value })}
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
