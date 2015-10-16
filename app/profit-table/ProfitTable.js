import React from 'react';
import { NumberColored } from '../common';
import { dateStr } from '../common/DateUtils';
import ProfitRow from './ProfitRow';

const calulateTotals = transactions => transactions.map(t => +t.amount).reduce((x, y) => x + y, 0);

const ProfitTable = ({transactions, onViewDetails}) => (
	<table>
		<thead>
			<tr>
                <th>Purchase Date</th>
				<th>Ref.</th>
				<th>Purchase Price</th>
                <th>Sale Date</th>
                <th>Sale Price</th>
                <th>Profit/Loss</th>
                <th></th>
			</tr>
		</thead>
		<tbody>
            {transactions.map(t => <ProfitRow key={t.transaction_id} transaction={t} onViewDetails={onViewDetails} />)}
		</tbody>
		<thead>
			<tr>
				<th>{transactions[0] && `${dateStr(transactions[0].date)} - ${dateStr(transactions[transactions.length - 1].date)}`}</th>
				<th colSpan={4}></th>
				<th>Total Profit/Loss</th>
                <th><NumberColored value={calulateTotals(transactions)} /></th>
                <th></th>
			</tr>
		</thead>
	</table>
);

ProfitTable.propTypes = {
	transactions: React.PropTypes.any.isRequired,
    onViewDetails: React.PropTypes.func.isRequired,
};

export default ProfitTable;
