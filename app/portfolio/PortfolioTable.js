import React from 'react';
import PortfolioRow from './PortfolioRow';

export default class PortfolioTable {

	render() {

        const { contracts } = this.props;

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
                    {contracts.map((c, i) => <PortfolioRow key={i} contract={c} />)}
				</tbody>
				<thead>
					<tr>
						<th></th>
						<th></th>
						<th>USD 149.62</th>
                        <th>USD 112.20</th>
                        <th></th>
					</tr>
				</thead>
			</table>
		);
	}
}
