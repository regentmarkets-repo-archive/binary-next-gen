import React, { PureComponent } from 'react';
import EmptySlate from '../containers/EmptySlate';
import StatementFilter from './StatementFilter';
import StatementTable from './StatementTable';

export default class StatementCard extends PureComponent {

	props: {
		transactions: Object[],
	};

	render() {
		const { transactions } = this.props;

		return (
			<div className="statement-card">
				<StatementFilter {...this.props} />
				{transactions.length === 0 ?
					<EmptySlate
						img="img/statement.svg"
						text="No transactions for the selected period"
					/> :
					<div className="statement-list scrollable">
						<StatementTable {...this.props} />
					</div>
				}
			</div>
		);
	}
}
