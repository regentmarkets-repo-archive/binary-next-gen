import React, { PropTypes } from 'react';
import { M, NumberColored, NumberPlain } from '../_common';
import { FormattedDate } from 'react-intl';
import StatementRow from './StatementRow';
import { epochToDate } from '../_utils/DateUtils';

export default class StatementTable extends React.Component {

	static propTypes = {
		compact: PropTypes.bool,
		transactions: PropTypes.array.isRequired,
		currency: PropTypes.string.isRequired,
		transactionsTotal: PropTypes.number.isRequired,
	};

	render() {
		const { compact, currency, transactions, transactionsTotal } = this.props;

		return (
			<table>
				<thead>
					<tr>
						<th>
							<M m="Purchase Date" />
						</th>
						{!compact && <th>
							<M m="Ref." />
						</th>}
						<th>
							<M m="Action"/>
						</th>
						<th>
							<M m="Credit/Debit" />
						</th>
						<th>
							<M m="Balance" /> ({currency})
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
						<th>
							<FormattedDate value={epochToDate(transactions[0].transaction_time)} />
						</th>
						<th></th>
						{!compact && <th></th>}
						<th><NumberColored value={transactionsTotal} /></th>
						<th><NumberPlain value={transactions[0].balance_after} /></th>
					</tr>
				</tfoot>
			</table>
		);
	}
}
