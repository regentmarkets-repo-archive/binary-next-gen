import React, { PropTypes } from 'react';
import StatementTable from './StatementTable';

export default class StatementCard extends React.Component {

	static propTypes = {
		account: PropTypes.object.isRequired,
		statement: PropTypes.object.isRequired,
		compact: PropTypes.bool,
	};

	render() {
		const { currency } = this.props.account.toJS();
		const { transactions } = this.props.statement.toJS();
		const { compact } = this.props;

		return (
			<StatementTable
				compact={compact}
				transactions={transactions}
				currency={currency}
			/>
		);
	}
}
