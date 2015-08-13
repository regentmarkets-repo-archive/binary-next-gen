import React from 'react';
import PortfolioRow from './PortfolioRow';

export default class PortfolioTable {

	render() {

        const { contracts, totals, onViewDetails } = this.props;

		contracts.slice().sort((x, y) => Math.sign(x.fmb_id, y.fmb_id));

		return (
			<table>
				<thead>
					<tr>
						<th>Ref.</th>
						<th>Contract Details</th>
						<th>Purchase</th>
                        <th>Indicative</th>
                        <th></th>
					</tr>
				</thead>
				<tbody>
                    {contracts.map((c, i) => <PortfolioRow key={i} contract={c} onViewDetails={onViewDetails} />)}
				</tbody>
				<thead>
					<tr>
						<th></th>
						<th></th>
						<th>USD&nbsp;{totals.purchase}</th>
                        <th>USD&nbsp;{totals.indicative}</th>
                        <th></th>
					</tr>
				</thead>
			</table>
		);
	}
}
