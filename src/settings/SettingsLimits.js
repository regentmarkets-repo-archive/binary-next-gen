import React from 'react';
import { NumberPlain } from '../_common';

export default class SettingsLimits extends React.Component {

	static propTypes = {
		settings: React.PropTypes.object.isRequired,
	};

	render() {
		const { settings } = this.props;

		return (
			<div>
				<h2>Trading Limits</h2>
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
							<td><NumberPlain value={settings.open_positions} digits={0} /></td>
						</tr>
						<tr>
							<td>Maximum account cash balance</td>
							<td><NumberPlain value={settings.account_balance} digits={0} /></td>
						</tr>
						<tr>
							<td>Maximum daily turnover</td>
							<td><NumberPlain value={settings.daily_turnover} digits={0} /></td>
						</tr>
						<tr>
							<td>Maximum aggregate payouts on open positions</td>
							<td><NumberPlain value={settings.payout} digits={0} /></td>
						</tr>
					</tbody>
				</table>
				<h2>Withdrawal limits</h2>
				<p>Your withdrawal limit is <strong>EUR <NumberPlain value={settings.lifetime_limit} digits={0} /></strong> (or equivalent in other currency).</p>
				<p>You have already withdrawn the equivalent of EUR <NumberPlain value={settings.withdrawal_for_x_days_monetary} digits={0} />.</p>
			</div>
		);
	}
}
