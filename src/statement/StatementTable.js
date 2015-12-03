import React from 'react';
import { NumberColored, NumberPlain } from '../_common';
import { FormattedDate, FormattedMessage } from 'react-intl';
import StatementRow from './StatementRow';

const calulateTotals = transactions => transactions.map(t => +t.amount).reduce((x, y) => x + y, 0);

const StatementTable = ({compact, currency, transactions}) => (
	<table>
		<thead>
			<tr>
				<th>
					<FormattedMessage
						id="purchase-date"
						description=""
						defaultMessage="Purchase Date"
						/>
				</th>
				{!compact && <th>
					<FormattedMessage
						id="ref"
						description=""
						defaultMessage="Ref."
						/>
				</th>}
				<th>
					<FormattedMessage
						id="action"
						description=""
						defaultMessage="Action"
						/>
				</th>
				<th>
					<FormattedMessage
						id="credit-debit"
						description=""
						defaultMessage="Credit/Debit"
						/>
				</th>
				<th>
					<FormattedMessage
						id="balance"
						description=""
						defaultMessage="Balance ({currency})"
						values={{currency: currency}}
						/>
				</th>
			</tr>
		</thead>
		<tbody>
            {transactions.map((t, i) =>
				<StatementRow
					key={i}
					compact={compact}
					transaction={t}
				/>
			)}
		</tbody>
		<tfoot>
			<tr>
				<th>{transactions[0] && <FormattedDate value={new Date(transactions[0].transaction_time * 1000)} />}</th>
				<th></th>
				{!compact && <th></th>}
				<th><NumberColored value={calulateTotals(transactions)} /></th>
				<th><NumberPlain value={transactions[0] && transactions[0].balance_after} /></th>
			</tr>
		</tfoot>
	</table>
);


StatementTable.propTypes = {
	compact: React.PropTypes.bool,
	transactions: React.PropTypes.array.isRequired,
};

export default StatementTable;
