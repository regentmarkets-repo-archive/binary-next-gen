import React from 'react';
import { NumberColored } from '../common';
import ProfitRow from './ProfitRow';

const calulateTotals = transactions => transactions.map(t => +t.get('sell_price') - +t.get('buy_price')).reduce((x, y) => x + y, 0);

const ProfitTable = ({compact, transactions, onViewDetails}) => (
	<table>
		<thead>
			<tr>
				{!compact && <th>Ref.</th>}
				<th>Purchase Date</th>
				<th>Purchase Price</th>
                {!compact && <th>Sale Date</th>}
                <th>Sale Price</th>
                <th>Profit/Loss</th>
                {!compact && <th></th>}
			</tr>
		</thead>
		<tbody>
            {transactions.map(t =>
				<ProfitRow
					key={t.get('transaction_id')}
					compact={compact}
					transaction={t}
					onViewDetails={onViewDetails} />)}
		</tbody>
		<tfoot>
			<tr>
				{!compact && <th></th>}
				{transactions.size ? <th>{transactions.first().get('purchase_time')} – {transactions.last().get('purchase_time')}</th> : <th />}
				<th></th>
				{!compact && <th></th>}
				<th>Total</th>
                <th><NumberColored value={calulateTotals(transactions)} /></th>
                {!compact && <th></th>}
			</tr>
		</tfoot>
	</table>
);

ProfitTable.propTypes = {
	compact: React.PropTypes.bool,
	transactions: React.PropTypes.any.isRequired,
    onViewDetails: React.PropTypes.func.isRequired,
};

export default ProfitTable;
