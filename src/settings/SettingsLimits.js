import React, { PropTypes, Component } from 'react';
import M from 'binary-components/lib/M';
import Td from 'binary-components/lib/Td';
import Th from 'binary-components/lib/Th';
import NumberPlain from 'binary-components/lib/NumberPlain';

export default class SettingsLimits extends Component {

	static propTypes = {
		settings: PropTypes.object.isRequired,
	};

	render() {
		const { settings } = this.props;

		return (
			<div className="setting-container">
				<h2>
					<M m="Trading Limits" />
				</h2>
				<table>
					<thead>
						<tr>
							<Th text="Item" />
							<th>
								<M m="Limit ({currency})" values={{ currency: 'USD' }} />
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<Td text="Maximum number of open positions" />
							<td><NumberPlain value={settings.open_positions} digits={0} /></td>
						</tr>
						<tr>
							<Td text="Maximum account cash balance" />
							<td><NumberPlain value={settings.account_balance} digits={0} /></td>
						</tr>
						<tr>
							<Td text="Maximum daily turnover" />
							<td><NumberPlain value={settings.daily_turnover} digits={0} /></td>
						</tr>
						<tr>
							<Td text="Maximum aggregate payouts on open positions" />
							<td><NumberPlain value={settings.payout} digits={0} /></td>
						</tr>
					</tbody>
				</table>
				<h2>
					<M m="Withdrawal limits" />
				</h2>
				<p>
					<M
						m="Your withdrawal limit is {limit} (or equivalent in other currency)."
						values={{ limit: <b>EUR <NumberPlain value={settings.lifetime_limit} digits={0} /></b> }}
					/>
				</p>
				<p>
					<M
						m="You have already withdrawn the equivalent of EUR {drawn}."
						values={{ drawn: <NumberPlain value={settings.withdrawal_for_x_days_monetary} digits={0} /> }}
					/>
				</p>
			</div>
		);
	}
}
