import React, { PropTypes, PureComponent } from 'react';
import { NumberPlain } from 'binary-components';

export default class BalanceCard extends PureComponent {

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
