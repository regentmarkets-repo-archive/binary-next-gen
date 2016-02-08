import React, { PropTypes } from 'react';
import { NumberPlain } from '../_common';

export default class BalanceCard extends React.Component {

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
