import React, { PropTypes, PureComponent } from 'react';
import { FormattedDate } from 'react-intl';
import { M, Th, NumberPlain, NumberColored } from 'binary-components';
import StatementRow from './StatementRow';

export default class StatementTable extends PureComponent {

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
						<Th className="date" text="Purchase Date" />
						{!compact && <Th className="textual" text="Ref." />}
						<Th className="textual" text="Action" />
						<Th className="numeric" text="Credit / Debit" />
						<th className="numeric">
							<M m="Balance" /> ({currency})
						</th>
					</tr>
				</thead>
				<tbody>
					{transactions.map((transaction, idx) =>
						<StatementRow
							key={idx}
							compact={compact}
							{...transaction}
						/>
					)}
				</tbody>
				<tfoot>
					<tr>
						<th className="date">
							<FormattedDate value={transactions[0].date} />
						</th>
						<th />
						{!compact && <th />}
						<th className="numeric">
							<NumberColored value={transactionsTotal} />
						</th>
						<th className="numeric">
							<NumberPlain value={transactions[0].balanceAfter} />
						</th>
					</tr>
				</tfoot>
			</table>
		);
	}
}
