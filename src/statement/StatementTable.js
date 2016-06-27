import React, { PropTypes, Component } from 'react';
import M from 'binary-components/lib/M';
import Th from 'binary-components/lib/Th';
import NumberPlain from 'binary-components/lib/NumberPlain';
import NumberColored from 'binary-components/lib/NumberColored';
import { FormattedDate } from 'react-intl';
import StatementRow from './StatementRow';

export default class StatementTable extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		compact: PropTypes.bool,
		transactions: PropTypes.array.isRequired,
		currency: PropTypes.string.isRequired,
		transactionsTotal: PropTypes.number.isRequired,
	};

	render() {
		const { actions, compact, currency, transactions, transactionsTotal } = this.props;

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
							actions={actions}
							key={idx}
							compact={compact}
							{...transaction}
						/>
					)}
				</tbody>
				<tfoot>
					<tr>
						<th>
							<FormattedDate value={transactions[0].date} />
						</th>
						<th />
						{!compact && <th />}
						<th><NumberColored value={transactionsTotal} /></th>
						<th><NumberPlain value={transactions[0].balanceAfter} /></th>
					</tr>
				</tfoot>
			</table>
		);
	}
}
