import React from 'react';
import { NumberColored, NumberPlain } from '../common';
import { dateStr } from '../common/DateUtils';
import StatementRow from './StatementRow';

const calulateTotals = transactions => transactions.map(t => +t.amount).reduce((x, y) => x + y, 0);

const StatementTable = ({transactions, currency, onViewDetails}) => (
	<table>
		<thead>
			<tr>
				<th>Date</th>
				<th>Ref.</th>
				<th>Action</th>
				<th>Credit/Debit</th>
				<th>Balance&nbsp;({currency})</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
            {transactions.map((t, i) => <StatementRow key={i} transaction={t} onViewDetails={onViewDetails} />)}
		</tbody>
		<thead>
			<tr>
				<th>{transactions[0] && dateStr(transactions[0].transaction_time)}</th>
				<th colSpan={3}></th>
				<th><NumberColored value={calulateTotals(transactions)} /></th>
				<th><NumberPlain value={transactions[0] && transactions[0].balance_after} /></th>
				<th></th>
			</tr>
		</thead>
	</table>
);


StatementTable.propTypes = {
	transactions: React.PropTypes.array.isRequired,
    onViewDetails: React.PropTypes.func.isRequired,
};

export default StatementTable;
