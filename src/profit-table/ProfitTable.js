import React, { PropTypes } from 'react';
import { NumberColored, FormattedDateRange } from '../_common';
import ProfitRow from './ProfitRow';
import M from '../_common/M';

const calulateTotals = transactions => transactions.map(t => +t.get('sell_price') - +t.get('buy_price')).reduce((x, y) => x + y, 0);

const ProfitTable = ({ compact, transactions }) => (
	<table>
		<thead>
			<tr>
				{!compact && <th>
					<M m="Ref." />
				</th>}
				<th>
					<M m="Purchase Date" />
				</th>
				<th>
					<M m="Purchase Price" />
				</th>
                {!compact && <th>
					<M m="Sale Date" />
				</th>}
                <th>
					<M m="Sale Price" />
				</th>
                <th>
					<M m="Profit/Loss" />
				</th>
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
				<th>
					<M m="Total" />
				</th>
                <th><NumberColored currency="USD" value={calulateTotals(transactions)} /></th>
			</tr>
		</tfoot>
	</table>
);

ProfitTable.propTypes = {
	compact: PropTypes.bool,
	transactions: PropTypes.any.isRequired,
};

export default ProfitTable;
