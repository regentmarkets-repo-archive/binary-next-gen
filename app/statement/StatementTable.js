import React from 'react';
import StatementRow from './StatementRow';

const StatementTable = ({transactions, totals, onViewDetails}) => {
	transactions.slice().sort((x, y) => Math.sign(x.fmb_id, y.fmb_id));

	return (
		<table>
			<thead>
				<tr>
					<th>Date</th>
					<th>Ref.</th>
					<th>Action</th>
					<th>Description</th>
					<th>Credit/Debit</th>
					<th>Balance (USD)</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
                {transactions.map((t, i) => <StatementRow key={i} transaction={t} onViewDetails={onViewDetails} />)}
			</tbody>
			<thead>
				<tr>
					<th>2015-08-14</th>
					<th colSpan={4}></th>
					<th>USD&nbsp;{totals.purchase}</th>
                    <th>USD&nbsp;{totals.indicative}</th>
				</tr>
			</thead>
		</table>
	);
};

StatementTable.propTypes = {
	transactions: React.PropTypes.array.isRequired,
	totals: React.PropTypes.object.isRequired,
    onViewDetails: React.PropTypes.func.isRequired,
};

export default StatementTable;
