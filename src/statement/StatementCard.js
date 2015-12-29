import React, { PropTypes } from 'react';
import StatementTable from './StatementTable';
import Tabs from '../_common/Tabs';
import { todayString, epochToDateString } from '../_utils/DateUtils';

export default class StatementCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeIdx: 0,
		};
	}

	static propTypes = {
		account: PropTypes.object.isRequired,
		statement: PropTypes.object.isRequired,
		compact: PropTypes.bool,
	};

	static tabs = [
		{ text: 'Today' },
		{ text: 'Yesterday' },
		{ text: 'This month' },
		{ text: 'Last month' },
	];

	static getToday(transactions) {
		const today = todayString();
		return transactions.filter(tx => today === epochToDateString(tx.transaction_time));
	}

	static getYesterday(transactions) {
		const yesterday = epochToDateString((Date.now() / 1000) - 86400);		// 1 day 86400 secs
		return transactions.filter(tx => yesterday === epochToDateString(tx.transaction_time));
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
			default: {
				return txArray;
			}
		}
	}

	onFilterChange(idx) {
		this.setState({ activeIdx: idx });
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
