import React from 'react';
import StatementTable from './StatementTable';

export default class StatementCard extends React.Component {

	static propTypes = {
		account: React.PropTypes.object.isRequired,
		statement: React.PropTypes.object.isRequired,
		compact: React.PropTypes.bool,
	};

	render() {
		const { currency } = this.props.account.toJS();
		const { transactions } = this.props.statement.toJS();
		const { compact } = this.props;

		return (
			<div>
				<StatementTable
					compact={compact}
					transactions={transactions}
					currency={currency} />
			</div>
		);
	}
}
