import React from 'react';
import { NumberColored, FormattedDateRange } from '../_common';
import ProfitRow from './ProfitRow';
import { FormattedMessage } from 'react-intl';

const calulateTotals = transactions => transactions.map(t => +t.get('sell_price') - +t.get('buy_price')).reduce((x, y) => x + y, 0);

const ProfitTable = ({ compact, transactions }) => (
	<table>
		<thead>
			<tr>
				{!compact && <th>
					<FormattedMessage
					id="ref"
					description=""
					defaultMessage="Ref." />
				</th>}
				<th>
					<FormattedMessage
						id="Purchase Date"
						defaultMessage="Purchase Date"
						/>
				</th>
				<th>
					<FormattedMessage
						id="Purchase Price"
						defaultMessage="Purchase Price"
						/>
				</th>
                {!compact && <th>
					<FormattedMessage
						id="Sale Date"
						defaultMessage="Sale Date"
						/>
				</th>}
                <th>
					<FormattedMessage
						id="Sale Price"
						defaultMessage="Sale Price"
						/>
				</th>
                <th>
					<FormattedMessage
						id="Profit/Loss"
						defaultMessage="Profit/Loss"
						/>
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
					<FormattedMessage
					id="Total"
					defaultMessage="Total"/>
				</th>
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
