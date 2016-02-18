import React, { PropTypes, Component } from 'react';
import NumberPlain from '../_common/NumberPlain';

export default class BalanceCard extends Component {

	static propTypes = {
		currency: PropTypes.string.isRequired,
		balance: PropTypes.number.isRequired,
	};

	render() {
		const { currency, balance } = this.props;

		return (
			<NumberPlain
				className="balance"
				currency={currency}
				value={balance}
			/>
		);
	}
}
