import React from 'react';
import { NumberColored } from '../common';
import ProfitRow from './ProfitRow';

const calulateTotals = transactions => transactions.map(t => +t.get('sell_price') - +t.get('buy_price')).reduce((x, y) => x + y, 0);

const ProfitTable = ({transactions, onViewDetails}) => {
	window.console.log(transactions);
	return (
	<table>
		<thead>
			<tr>
				<th>Ref.</th>
				<th>Purchase Date</th>
				<th>Purchase Price</th>
                <th>Sale Date</th>
                <th>Sale Price</th>
                <th>Profit/Loss</th>
                <th></th>
			</tr>
		</thead>
		<tbody>
            {transactions.map(t =>
				<ProfitRow
					key={t.get('transaction_id')}
					transaction={t}
					onViewDetails={onViewDetails} />)}
		</tbody>
		<thead>
			<tr>
				<th></th>
				{transactions.size ? <th>{transactions.first().get('purchase_time')} – {transactions.last().get('purchase_time')}</th> : <th />}
				<th colSpan={2}></th>
				<th>Total Profit/Loss</th>
                <th><NumberColored value={calulateTotals(transactions)} /></th>
                <th></th>
			</tr>
		</thead>
	</table>
);
};

ProfitTable.propTypes = {
	transactions: React.PropTypes.any.isRequired,
    onViewDetails: React.PropTypes.func.isRequired,
};

export default ProfitTable;
