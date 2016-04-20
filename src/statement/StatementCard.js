import React, { PropTypes, Component } from 'react';
import StatementTable from './StatementTable';
import M from '../_common/M';
import Tab from '../_common/Tab';
import TabList from '../_common/TabList';

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
							<M m="There are no transactions for selected period" />
						</div>
					}
				</div>
			</div>
		);
	}
}
