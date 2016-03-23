import React, { PropTypes, Component } from 'react';
import RadioGroup from '../_common/RadioGroup';
import InputGroup from '../_common/InputGroup';

const basisTypes = [
	{ value: 'payout', text: 'Payout' },
	{ value: 'stake', text: 'Stake' },
];

const payoutAmounts = [1, 2, 5, 10, 20, 50, 100, 500, 1000].map(x => ({ value: x, text: x }));
const maxAmount = 100000;
const minAmount = 1;

export default class PayoutPickerCard extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		params: PropTypes.object.isRequired,
		trades: PropTypes.array.isRequired,
	};

	updateValue(name, value) {
		const { actions } = this.props;
		const { id } = this.props.params;

		if (name === 'amount') {
			let amount = +value;
			if (amount > maxAmount) {
				amount = maxAmount;
			} else if (amount < minAmount) {
				amount = minAmount;
			}

			actions.updateTradeParams(id, name, amount);
		} else {
			actions.updateTradeParams(id, name, value);
		}
	}

	render() {
		const { trades } = this.props;
		const { id } = this.props.params;
		const { query } = this.props.location;
		const currency = query.currency;
		const trade = trades[id];

		return (
			<div id="payout-picker">
				<RadioGroup
					name="basis"
					options={basisTypes}
					value={trade.basis}
					onChange={e => this.updateValue('basis', e.target.value)}
					{...this.props}
				/>
				<InputGroup
					type="number"
					label={currency}
					min={minAmount} max={maxAmount}
					value={trade.amount}
					onChange={e => this.updateValue('amount', e.target.value)}
				/>
				<RadioGroup
					name="amount"
					value={trade.amount}
					options={payoutAmounts}
					onChange={e => this.updateValue('amount', e.target.value)}
					{...this.props}
				/>
			</div>
		);
	}
}
