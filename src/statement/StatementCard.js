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
		transactionFilter: PropTypes.number.isRequired,
		transactions: PropTypes.array.isRequired,
	};

	onFilterChange(idx) {
		const { actions } = this.props;
		actions.updateWorkspaceField('transactionFilter', idx);
	}

	render() {
		const { compact, currency, transactionFilter, transactions } = this.props;

		return (
			<div>
				<TabList
					activeIndex={transactionFilter}
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
						currency={currency}
					/> :
					<M m="There are no transactions for selected period" />
				}
			</div>
		);
	}
}
