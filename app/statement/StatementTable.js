import React from 'react';
import StatementRow from './StatementRow';

export default class StatementTable {

	render() {

        const { contracts, totals, onViewDetails } = this.props;

		contracts.slice().sort((x, y) => Math.sign(x.fmb_id, y.fmb_id));

		return (
			<table>
				<thead>
					<tr>
						<th>Date</th>
						<th>Ref.</th>
						<th>Action</th>
						<th>Description</th>
						<th>Credit/Debit</th>
						<th>Balance (USD)</th>
					</tr>
				</thead>
				<tbody>
                    {contracts.map((c, i) => <StatementRow key={i} contract={c} onViewDetails={onViewDetails} />)}
				</tbody>
				<thead>
					<tr>
						<th>2015-08-14</th>
						<th colSpan="3"></th>
						<th>USD&nbsp;{totals.purchase}</th>
                        <th>USD&nbsp;{totals.indicative}</th>
					</tr>
				</thead>
			</table>
		);
	}
}
