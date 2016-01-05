import React, { PropTypes } from 'react';
import StatementTable from './StatementTable';
import Tabs from '../_common/Tabs';
import * as LiveData from '../_data/LiveData';
import { todayString, epochToDateString, todayEpoch, xDayEpoch } from '../_utils/DateUtils';
import { forceStatementUpdate } from '../_utils/ApiWorkaroundUtils';

const getLastXMonthEpoch = x => {
	const d = new Date();
	d.setMonth(d.getMonth() - x);
	return Math.floor(d.getTime() / 1000);
};

export default class StatementCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeIdx: 0,
		};
	}

	componentWillMount() {
		forceStatementUpdate();
	}

	static propTypes = {
		account: PropTypes.object.isRequired,
		statement: PropTypes.object.isRequired,
		compact: PropTypes.bool,
	};

	static tabs = [
		{ text: 'Today' },
		{ text: 'Yesterday' },
		{ text: 'Last 30 days' },
		{ text: 'Last 60 days' },
	];

	static getToday(transactions) {
		const today = todayString();
		return transactions.filter(tx => today === epochToDateString(tx.transaction_time));
	}

	static getYesterday(transactions) {
		const yesterday = epochToDateString((Date.now() / 1000) - 86400);		// 1 day 86400 secs
		return transactions.filter(tx => yesterday === epochToDateString(tx.transaction_time));
	}

	static getLast30Days(transactions) {
		const last30DaysEpoch = getLastXMonthEpoch(1);
		return transactions.filter(tx => tx.transaction_time > last30DaysEpoch);
	}

	static getLast60Days(transactions) {
		const last60DaysEpoch = getLastXMonthEpoch(2);
		return transactions.filter(tx => tx.transaction_time > last60DaysEpoch);
	}

	dateFilter(idx) {
		const { transactions } = this.props.statement.toJS();
		const txArray = Object.keys(transactions).map(k => transactions[k]);

		switch (idx) {
			case 0: {
				return StatementCard.getToday(txArray);
			}
			case 1: {
				return StatementCard.getYesterday(txArray);
			}
			case 2: {
				return StatementCard.getLast30Days(txArray);
			}
			case 3: {
				return StatementCard.getLast60Days(txArray);
			}
			default: {
				return txArray;
			}
		}
	}

	onFilterChange(idx) {
		this.setState({ activeIdx: idx });
		switch (idx) {
			case 0: {
				const today = todayEpoch();
				LiveData.api.getStatement({ description: 1, date_from: today });
				break;
			}
			case 1: {
				const yesterday = xDayEpoch(-1);
				LiveData.api.getStatement({ description: 1, date_from: yesterday });
				break;
			}
			case 2: {
				const lastMonthEpoch = getLastXMonthEpoch(1);
				LiveData.api.getStatement({ description: 1, date_from: lastMonthEpoch });
				break;
			}
			case 3: {
				const last2MonthEpoch = getLastXMonthEpoch(2);
				LiveData.api.getStatement({ description: 1, date_from: last2MonthEpoch });
				break;
			}
			default: {
				return;
			}
		}
	}

	render() {
		const { currency } = this.props.account.toJS();
		const { activeIdx } = this.state;
		const filteredTransactions = this.dateFilter(activeIdx);
		const { compact } = this.props;

		return (
			<div>
				<Tabs
					id="statement-filter"
					tabs={StatementCard.tabs}
					activeIndex={activeIdx}
					onChange={::this.onFilterChange}
				/>
				<StatementTable
					compact={compact}
					transactions={filteredTransactions}
					currency={currency}
				/>
			</div>
		);
	}
}
