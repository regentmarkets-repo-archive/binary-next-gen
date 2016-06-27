import React, { PropTypes, Component } from 'react';
import P from 'binary-components/lib/P';
import StatementFilter from './StatementFilter';
import StatementTable from './StatementTable';

export default class StatementCard extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		currency: PropTypes.string.isRequired,
		compact: PropTypes.bool,
		transactionsFilter: PropTypes.number.isRequired,
		transactions: PropTypes.array.isRequired,
		transactionsTotal: PropTypes.number.isRequired,
	};

	render() {
		const { transactions } = this.props;

		return (
			<div className="statement-card">
				<StatementFilter {...this.props} />
				<div className="statement-list">
					{transactions.length === 0 ?
						<P className="notice-msg" text="No transactions for the selected period" /> :
						<StatementTable {...this.props} />
					}
				</div>
			</div>
		);
	}
}
