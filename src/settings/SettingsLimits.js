import React, { PropTypes, Component } from 'react';
import M from 'binary-components/lib/M';
import P from 'binary-components/lib/P';
import Td from 'binary-components/lib/Td';
import NumberPlain from 'binary-components/lib/NumberPlain';

export default class SettingsLimits extends Component {

	static propTypes = {
		account_balance: PropTypes.number.isRequired,
		num_of_days: PropTypes.number.isRequired,
		withdrawal_for_x_days_monetary: PropTypes.number.isRequired,
		remainder: PropTypes.number.isRequired,
		open_positions: PropTypes.number.isRequired,
		lifetime_limit: PropTypes.number.isRequired,
		num_of_days_limit: PropTypes.number.isRequired,
		withdrawal_since_inception_monetary: PropTypes.number.isRequired,
		market_specific: PropTypes.object.isRequired,
		payout: PropTypes.number.isRequired,
	};

	render() {
		const { account_balance, num_of_days, withdrawal_for_x_days_monetary,
			remainder, open_positions, lifetime_limit, num_of_days_limit,
			withdrawal_since_inception_monetary, market_specific, payout } = this.props;

		const marketLimits = [].concat(...Object.values(market_specific));

		return (
			<div className="settings-limits">
				<h5><M m="Trading Limits" /></h5>
				<table>
					<thead><tr /></thead>
					<tbody>
						<tr>
							<Td text="Maximum number of open positions" />
							<td className="numeric">
								<NumberPlain value={open_positions} digits={0} />
							</td>
						</tr>
						<tr>
							<Td text="Maximum account cash balance" />
							<td className="numeric">
								<NumberPlain value={account_balance} digits={0} />
							</td>
						</tr>
						<tr>
							<Td text="Maximum aggregate payouts on open positions" />
							<td className="numeric">
								<NumberPlain value={payout} digits={0} />
							</td>
						</tr>
					</tbody>
				</table>
				<h5><M m="Maximum Daily Turnover" /></h5>
				<table>
					<thead><tr /></thead>
					<tbody>
						{marketLimits.map(x =>
							<tr key={x.name}>
								<Td text={x.name} />
								<td className="numeric">
									<NumberPlain value={x.turnover_limit} digits={0} />
								</td>
							</tr>
						)}
					</tbody>
				</table>
				<P className="notice-msg" text="Stated limits are subject to change without prior notice" />
				<h5><M m="Withdrawal Limits" /></h5>
				<table>
					<thead><tr /></thead>
					<tbody>
						<tr>
							<Td text="Withdrawal limit" />
							<td className="numeric">
								<NumberPlain value={lifetime_limit} digits={0} />
							</td>
						</tr>
						<tr>
							<Td text="Already withdrawn" />
							<td className="numeric">
								<NumberPlain value={withdrawal_for_x_days_monetary} digits={0} />
							</td>
						</tr>
						<tr>
							<Td text="Current immediate maximum withdrawal" />
							<td className="numeric">
								<NumberPlain value={lifetime_limit} digits={0} />
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}
