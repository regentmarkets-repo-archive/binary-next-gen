import React from 'react';
import { InputGroup } from '../_common';

export default class SettingsSelfExclusion extends React.Component {

	static propTypes = {
		settings: React.PropTypes.object.isRequired,
		actions: React.PropTypes.object.isRequired,
	};

	static handleUpdateError(response) {
		if (response.code === 'InputValidationFailed') {	// again evil code duplication
			let errorDetails;
			for (const k in response.details) {
				if (response.details.hasOwnProperty(k)) {
					errorDetails = errorDetails + `\n${k} ${response.details[k]}`;
				}
			}
		}
	}

	onSelfExclusionChange(event) {
		const key = event.target.id;		// code duplication, should be refactored into some mixin
		const val = event.target.value;
		const obj = {};
		obj[key] = val;
		this.setState(obj);
	}

	tryUpdate() {
		const state = this.state || {};
		const req = {
			max_balance: state.MAXCASHBAL,
			max_turnover: state.DAILYTURNOVERLIMIT,
			max_losses: state.DAILYLOSSLIMIT,
			max_7day_turnover: state['7DAYTURNOVERLIMIT'],
			max_7day_losses: state['7DAYLOSSLIMIT'],
			max_open_bets: state.MAXOPENPOS,
			session_duration_limit: state.SESSIONDURATION,
			exclude_until: state.EXCLUDEUNTIL,
		};

		this.props.actions.attemptUpdateSelfExclusion(req, SettingsSelfExclusion.handleUpdateError);
	}

	render() {
		const {settings} = this.props;
		return (
			<div className="mobile-form">
				<InputGroup
					id="MAXCASHBAL"
					label="Maximum account cash balance"
					type="number"
					hint="Once this limit is reached, you may no longer deposit."
					value={settings.max_balance}
					onChange={::this.onSelfExclusionChange} />
				<InputGroup
					id="DAILYTURNOVERLIMIT"
					label="Daily turnover limit"
					type="number"
					hint="Maximum aggregate contract purchases per day."
					value={settings.max_turnover}
					onChange={::this.onSelfExclusionChange} />
				<InputGroup
					id="DAILYLOSSLIMIT"
					label="Daily limit on losses"
					type="number"
					hint="Maximum aggregate loss per day."
					value={settings.max_losses}
					onChange={::this.onSelfExclusionChange} />
				<InputGroup
					id="7DAYTURNOVERLIMIT"
					label="7-day turnover limit"
					type="number"
					hint="Maximum aggregate contract purchases over a 7-day period."
					value={settings.max_7day_turnover}
					onChange={::this.onSelfExclusionChange} />
				<InputGroup
					id="7DAYLOSSLIMIT"
					label="7-day limit on losses"
					type="number"
					hint="Maximum aggregate loss over a 7-day period."
					value={settings.max_7day_losses}
					onChange={::this.onSelfExclusionChange} />
				<InputGroup
					id="MAXOPENPOS"
					label="Maximum number of open positions"
					type="number"
					value={settings.max_open_bets}
					onChange={::this.onSelfExclusionChange} />
				<InputGroup
					id="SESSIONDURATION"
					label="Session duration limit, in minutes"
					type="number"
					hint="You will be automatically logged out after such time."
					value={settings.session_duration_limit}
					onChange={::this.onSelfExclusionChange} />
				<InputGroup
					id="EXCLUDEUNTIL"
					label="Exclude me from the website until"
					type="text"
					hint="Please enter date in the format YYYY-MM-DD."
					value={settings.exclude_until}
					onChange={::this.onSelfExclusionChange} />

				<button onClick={::this.tryUpdate}>Update Settings</button>
			</div>
		);
	}
}
