import React from 'react';
import { NumberColored, FormattedDateRange } from '../_common';
import ProfitRow from './ProfitRow';

const calulateTotals = transactions => transactions.map(t => +t.get('sell_price') - +t.get('buy_price')).reduce((x, y) => x + y, 0);

const ProfitTable = ({compact, transactions}) => (
	<table>
		<thead>
			<tr>
				{!compact && <th>Ref.</th>}
				<th>Purchase Date</th>
				<th>Purchase Price</th>
                {!compact && <th>Sale Date</th>}
                <th>Sale Price</th>
                <th>Profit/Loss</th>
			</tr>
		</thead>
		<tbody>
            {transactions.map(t =>
				<ProfitRow
					key={t.get('transaction_id')}
					compact={compact}
					transaction={t}
				/>
			)}
		</tbody>
		<tfoot>
			<tr>
				{!compact && <th></th>}
				<th>
					{transactions.size &&
					<FormattedDateRange
						fromDate={new Date(transactions.first().get('purchase_time') * 1000)}
						toDate={new Date(transactions.last().get('purchase_time') * 1000)}
					/>}
				</th>
				<th></th>
				{!compact && <th></th>}
				<th>Total</th>
                <th><NumberColored value={calulateTotals(transactions)} /></th>
			</tr>
		</tfoot>
	</table>
);

ProfitTable.propTypes = {
	compact: React.PropTypes.bool,
	transactions: React.PropTypes.any.isRequired,
};

export default ProfitTable;
