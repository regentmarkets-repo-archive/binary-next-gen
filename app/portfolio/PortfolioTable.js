import React from 'react';
import PortfolioRow from './PortfolioRow';

export default class PortfolioTable {

	render() {

        const times = [{}, {}, {}];

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
                    {times.map((t, i) => <PortfolioRow key={i} time={t} />)}
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
