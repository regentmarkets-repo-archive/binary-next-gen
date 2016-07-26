import React, { PropTypes, PureComponent } from 'react';
import Button from 'binary-components/lib/Button';
import InputGroup from 'binary-components/lib/InputGroup';
import showError from 'binary-utils/lib/showError';
import showInfo from 'binary-utils/lib/showInfo';
import * as LiveData from '../_data/LiveData';
import xMonthsAfter from 'binary-utils/lib/xMonthsAfter';
import dateToDateString from 'binary-utils/lib/dateToDateString';
import dateToEpoch from 'binary-utils/lib/dateToEpoch';

export default class SettingsSelfExclusion extends PureComponent {

	static propTypes = {
		max_balance: PropTypes.number,
		max_turnover: PropTypes.number,
		max_losses: PropTypes.number,
		max_7day_turnover: PropTypes.number,
		max_7day_losses: PropTypes.number,
		max_30day_turnover: PropTypes.number,
		max_30day_losses: PropTypes.number,
		max_open_bets: PropTypes.number,
		session_duration_limit: PropTypes.number,
		timeout_until: PropTypes.number,
		exclude_until: PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.state = {
			max_balance: props.max_balance,
			max_turnover: props.max_turnover,
			max_losses: props.max_losses,
			max_7day_turnover: props.max_7day_turnover,
			max_7day_losses: props.max_7day_losses,
			max_30day_turnover: props.max_30day_turnover,
			max_30day_losses: props.max_30day_losses,
			max_open_bets: props.max_open_bets,
			session_duration_limit: props.session_duration_limit,
			timeout_until_time: props.timeout_until,
			timeout_until_date: props.timeout_until,
			exclude_until: props.exclude_until,
		};
	}

	onEntryChange = e =>
		this.setState({ [e.target.id]: e.target.value });

	tryUpdate = () => {
		const { max_balance, max_turnover, max_losses, max_7day_turnover, max_7day_losses,
			max_30day_turnover, max_30day_losses, max_open_bets, session_duration_limit,
			timeout_until_time, timeout_until_date, exclude_until } = this.state;
		const timeout_until = dateToEpoch(new Date(timeout_until_date + ' ' + timeout_until_time));
		const newState = {
			max_balance,
			max_turnover,
			max_losses,
			max_7day_turnover,
			max_7day_losses,
			max_30day_turnover,
			max_30day_losses,
			max_open_bets,
			session_duration_limit,
			exclude_until,
			timeout_until,
		};
		LiveData.api.setSelfExclusion(newState).then(() => {
			showInfo('Updated');
		}).catch(response => {
			showError(response.error.message);
		});
	}

	render() {
		const { max_balance, max_turnover, max_losses, max_7day_turnover,
			max_7day_losses, max_30day_turnover, max_30day_losses, max_open_bets,
			session_duration_limit, exclude_until } = this.state;

		return (
			<div className="settings-self-exclusion">
				<InputGroup
					id="max_balance"
					label="Maximum account cash balance"
					type="number"
					// hint="Once this limit is reached, you may no longer deposit."
					defaultValue={max_balance}
					onChange={this.onEntryChange}
				/>
				<InputGroup
					id="max_turnover"
					label="Daily turnover limit"
					type="number"
					// hint="Maximum aggregate contract purchases per day."
					defaultValue={max_turnover}
					onChange={this.onEntryChange}
				/>
				<InputGroup
					id="max_losses"
					label="Daily limit on losses"
					type="number"
					// hint="Maximum aggregate loss per day."
					defaultValue={max_losses}
					onChange={this.onEntryChange}
				/>
				<InputGroup
					id="max_7day_turnover"
					label="7-day turnover limit"
					type="number"
					// hint="Maximum aggregate contract purchases over a 7-day period."
					defaultValue={max_7day_turnover}
					onChange={this.onEntryChange}
				/>
				<InputGroup
					id="max_7day_losses"
					label="7-day limit on losses"
					type="number"
					// hint="Maximum aggregate loss over a 7-day period."
					defaultValue={max_7day_losses}
					onChange={this.onEntryChange}
				/>
				<InputGroup
					id="max_30day_turnover"
					label="30-day turnover limit"
					type="number"
					// hint="Maximum aggregate contract purchases over a 30-day period."
					defaultValue={max_30day_turnover}
					onChange={this.onEntryChange}
				/>
				<InputGroup
					id="max_30day_losses"
					label="30-day limit on losses"
					type="number"
					// hint="Maximum aggregate loss over a 30-day period."
					defaultValue={max_30day_losses}
					onChange={this.onEntryChange}
				/>
				<InputGroup
					id="max_open_bets"
					label="Maximum number of open positions"
					type="number"
					defaultValue={max_open_bets}
					onChange={this.onEntryChange}
				/>
				<InputGroup
					id="session_duration_limit"
					label="Session duration limit, in minutes"
					type="number"
					// hint="You will be automatically logged out after such time."
					defaultValue={session_duration_limit}
					onChange={this.onEntryChange}
				/>
				<InputGroup
					id="timeout_until_date"
					label="Time out until date"
					type="date"
					defaultValue={session_duration_limit}
					onChange={this.onEntryChange}
				/>
				<InputGroup
					id="timeout_until_time"
					label="Time out until time"
					type="time"
					hintttt=""
					defaultValue={session_duration_limit}
					onChange={this.onEntryChange}
				/>
				<InputGroup
					id="exclude_until"
					label="Exclude me from the website until"
					type="date"
					defaultValue={exclude_until}
					min={dateToDateString(xMonthsAfter(6))}
					onChange={this.onEntryChange}
				/>
				<Button
					text="Update"
					onClick={this.tryUpdate}
				/>
			</div>
		);
	}
}
