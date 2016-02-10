import React, { PropTypes } from 'react';
import StatementTable from './StatementTable';
import { M } from '../_common';
import Tab from '../_common/Tab';
import TabList from '../_common/TabList';

export default class StatementCard extends React.Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		currency: PropTypes.string.isRequired,
		compact: PropTypes.bool,
		transactionsFilter: PropTypes.number.isRequired,
		transactions: PropTypes.array.isRequired,
		transactionsTotal: PropTypes.number.isRequired,
	};

	onFilterChange(idx) {
		const { actions } = this.props;
		actions.updateWorkspaceField('transactionsFilter', idx);
	}

	render() {
		const { compact, currency, transactionsFilter, transactions, transactionsTotal } = this.props;

		return (
			<div>
				<TabList
					activeIndex={transactionsFilter}
					onChange={::this.onFilterChange}
				>
					<Tab text="Today" />
					<Tab text="Yesterday" />
					<Tab text="Last 7 Days" />
					<Tab text="Last 30 Days" />
				</TabList>
				{transactions.length > 0 ?
					<StatementTable
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
		);
	}
}
