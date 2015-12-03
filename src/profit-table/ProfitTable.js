import React from 'react';
import { NumberColored, FormattedDateRange } from '../_common';
import ProfitRow from './ProfitRow';
import { FormattedMessage } from 'react-intl';

const calulateTotals = transactions => transactions.map(t => +t.get('sell_price') - +t.get('buy_price')).reduce((x, y) => x + y, 0);

const ProfitTable = ({compact, transactions}) => (
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
						id="purchase-date"
						description=""
						defaultMessage="Purchase Date"
						/>
				</th>
				<th>
					<FormattedMessage
						id="purchase-price"
						description=""
						defaultMessage="Purchase Price"
						/>
				</th>
                {!compact && <th>
					<FormattedMessage
						id="sale-date"
						description=""
						defaultMessage="Sale Date"
						/>
				</th>}
                <th>
					<FormattedMessage
						id="sale-price"
						description=""
						defaultMessage="Sale Price"
						/>
				</th>
                <th>
					<FormattedMessage
						id="profit-loss"
						description=""
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
					id="total"
					description=""
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
