import React from 'react';

export default class SettingsLimits extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {

		return (
			<div>
				<h2>CR300810 - Trading Limits</h2>
				<table>
					<thead>
						<tr>
							<th>Item</th>
							<th>Limit (USD)</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Maximum number of open positions</td>
							<td>60</td>
						</tr>
						<tr>
							<td>Maximum account cash balance</td>
							<td>300,000</td>
						</tr>
						<tr>
							<td>Maximum daily turnover</td>
							<td>30,000</td>
						</tr>
						<tr>
							<td>Maximum aggregate payouts on open positions</td>
							<td>50,000</td>
						</tr>
					</tbody>
				</table>
				<h2>CR300810 - Withdrawal limits</h2>
				<p>Your withdrawal limit is <strong>EUR 10,000</strong> (or equivalent in other currency).</p>
				<p>You have already withdrawn the equivalent of EUR 0.</p>
			</div>
		);
	}
}
