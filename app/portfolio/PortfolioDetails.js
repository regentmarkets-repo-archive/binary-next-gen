import React from 'react';

export default class PortfolioDetails extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		return (
			<div>
				<table>
					<thead>
						<tr>
							<th>Start Time</th>
							<th>Now</th>
							<th>End Time</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>2015-07-27 23:26:02</td>
							<td>2015-07-28 15:51:27</td>
							<td>2015-08-01 23:59:59</td>
						</tr>
						<tr>
							<td></td>
							<td>16 hours 25 minutes</td>
							<td>4 days 8 hours</td>
						</tr>
					</tbody>
					<thead>
						<tr>
							<th>Entry Spot</th>
							<th>Current Spot</th>
							<th>Exit Spot</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>10033.24</td>
							<td>9456.57</td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td></td>
							<td></td>
						</tr>
					</tbody>
					<thead>
						<tr>
							<th>Purchase Price</th>
							<th>Indicative Price</th>
							<th>Final Price</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>USD 49.16</td>
							<td>USD 27.28</td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td>-44.51%</td>
							<td></td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}
