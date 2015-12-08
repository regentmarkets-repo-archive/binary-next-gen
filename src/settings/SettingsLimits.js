import React, { PropTypes } from 'react';
import { NumberPlain, M } from '../_common';

export default class SettingsLimits extends React.Component {

	static propTypes = {
		settings: PropTypes.object.isRequired,
	};

	render() {
		const { settings } = this.props;

		return (
			<div>
				<h2>
					<M m="Trading Limits" />
				</h2>
				<table>
					<thead>
						<tr>
							<th>
								<M m="Item" />
							</th>
							<th>
								<M m="Limit ({currency})" values={{ currency: 'USD' }}/>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<M m="Maximum number of open positions" />
							</td>
							<td><NumberPlain value={settings.open_positions} digits={0} /></td>
						</tr>
						<tr>
							<td>
								<M m="Maximum account cash balance" />
							</td>
							<td><NumberPlain value={settings.account_balance} digits={0} /></td>
						</tr>
						<tr>
							<td>
								<M m="Maximum daily turnover" />
							</td>
							<td><NumberPlain value={settings.daily_turnover} digits={0} /></td>
						</tr>
						<tr>
							<td>
								<M m="Maximum aggregate payouts on open positions" />
							</td>
							<td><NumberPlain value={settings.payout} digits={0} /></td>
						</tr>
					</tbody>
				</table>
				<h2>
					<M m="Withdrawal limits" />
				</h2>
				<p>
					<M m="Your withdrawal limit is {limit} (or equivalent in other currency)."
						values={{ limit: <strong>EUR <NumberPlain value={settings.lifetime_limit} digits={0} /></strong> }} />
				</p>
				<p>
					<M m="You have already withdrawn the equivalent of EUR {drawn}."
						values={{ drawn: <NumberPlain value={settings.withdrawal_for_x_days_monetary} digits={0} /> }} />
				</p>
			</div>
		);
	}
}
