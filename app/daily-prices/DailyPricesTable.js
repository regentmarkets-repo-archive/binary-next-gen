import React from 'react';
import Direction from '../common/Direction';

export default class DailyPricesTable {

	render() {

		return (
			<table>
				<thead>
					<tr>
						<th>Date</th>
						<th>Open</th>
						<th>High</th>
						<th>Low</th>
						<th>Close</th>
						<th>Change</th>
						<th>Rel Change</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>2015-07-27-1.36%</td>
						<td>168.68</td>
						<td>169.45</td>
						<td>165.90</td>
						<td>166.38</td>
						<td>-2.30</td>
						<td>-2.30<Direction diff={-2.30} /></td>
					</tr>
				</tbody>
				<thead>
					<tr>
						<th colSpan="7">Summary</th>
					</tr>
					<tr>
						<th>Statistic</th>
						<th>Open</th>
						<th>High</th>
						<th>Low</th>
						<th>Close</th>
						<th>Average Change</th>
						<th>Rel Change</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Maximum</td>
						<td>168.68</td>
						<td>169.45</td>
						<td>165.90</td>
						<td>166.38</td>
						<td>-2.30</td>
						<td>-2.30<Direction diff={-2.30} /></td>
					</tr>
				</tbody>
			</table>
		);
	}
}
