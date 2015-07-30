import React from 'react';
import PortfolioRow from './PortfolioRow';

export default class PortfolioTable {

	render() {

        const { contracts, totals, onViewDetails } = this.props;

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
						<th>USD {totals.purchase}</th>
                        <th>USD {totals.indicative}</th>
                        <th></th>
					</tr>
				</thead>
			</table>
		);
	}
}
