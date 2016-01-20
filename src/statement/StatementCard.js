import React, { PropTypes } from 'react';
import StatementTable from './StatementTable';
import { M, Tabs } from '../_common';
import * as LiveData from '../_data/LiveData';
import { todayEpoch, yesterdayEpoch, last7DaysEpoch, last30DaysEpoch } from '../_utils/DateUtils';

export default class StatementCard extends React.Component {

	static propTypes = {
		currency: PropTypes.string.isRequired,
		compact: PropTypes.bool,
		// transactions: PropTypes.object.isRequired,
		transactionsToday: PropTypes.array.isRequired,
		transactionsYesterday: PropTypes.array.isRequired,
		transactionsLast7Days: PropTypes.array.isRequired,
		transactionsLast30Days: PropTypes.array.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = {
			activeIdx: 0,
		};
		this.filters = [
			{ text: 'Today', epochFunc: todayEpoch, transactions: this.props.transactionsToday },
			{ text: 'Yesterday', epochFunc: yesterdayEpoch, transactions: this.props.transactionsYesterday },
			{ text: 'Last 7 Days', epochFunc: last7DaysEpoch, transactions: this.props.transactionsLast7Days },
			{ text: 'Last 30 Days', epochFunc: last30DaysEpoch, transactions: this.props.transactionsLast30Days },
		];
	}

	onFilterChange(idx) {
		this.setState({ activeIdx: idx });
		LiveData.api.getStatement({
			description: 1,
			date_from: this.filters[idx].epochFunc(),
		});
	}

	render() {
		const { activeIdx } = this.state;
		const shownTransactions = this.filters[activeIdx].transactions;
		const { compact, currency } = this.props;

		return (
			<div>
				<Tabs
					id="statement-filter"
					tabs={this.filters}
					activeIndex={activeIdx}
					onChange={::this.onFilterChange}
				/>
				{shownTransactions.length > 0 ?
					<StatementTable
						compact={compact}
						transactions={shownTransactions}
						currency={currency}
					/> :
					<M m="There are no transactions for selected period" />
				}
			</div>
		);
	}
}
