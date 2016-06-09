import React, { PropTypes, Component } from 'react';
import StatementTable from './StatementTable';
import M from 'binary-components/lib/M';
import Tab from 'binary-components/lib/Tab';
import TabList from 'binary-components/lib/TabList';

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
		const { actions, compact, currency, transactionsFilter, transactions, transactionsTotal } = this.props;

		return (
			<div className="statement-card">
				<TabList
					activeIndex={transactionsFilter}
					onChange={idx => actions.updateTransactionsFilter(idx)}
				>
					<Tab text="Today" />
					<Tab text="Yesterday" />
					<Tab text="Last 7 Days" />
					<Tab text="Last 30 Days" />
				</TabList>
				<div className="statement-list">
					{transactions.length > 0 ?
						<StatementTable
							actions={actions}
							compact={compact}
							transactions={transactions}
							transactionsTotal={transactionsTotal}
							currency={currency}
						/> :
						<div className="centerer">
							<M m="There are no transactions for the selected period" />
						</div>
					}
				</div>
			</div>
		);
	}
}
