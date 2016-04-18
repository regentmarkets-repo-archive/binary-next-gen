import React, { PropTypes, Component } from 'react';
import M from '../_common/M';
import NumberPlain from '../_common/NumberPlain';
import NumberColored from '../_common/NumberColored';
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
						<th>
							<M m="Purchase Date" />
						</th>
						{!compact &&
							<th>
								<M m="Ref." />
							</th>
						}
						<th>
							<M m="Action" />
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
						{!compact && <th></th>}
						<th><NumberColored value={transactionsTotal} /></th>
						<th><NumberPlain value={transactions[0].balanceAfter} /></th>
					</tr>
				</tfoot>
			</table>
		);
	}
}
