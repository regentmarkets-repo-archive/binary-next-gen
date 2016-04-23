import React, { PropTypes, Component } from 'react';
import Button from '../_common/Button';
import InputGroup from '../_common/InputGroup';
import * as LiveData from '../_data/LiveData';

export default class SettingsSelfExclusion extends Component {

	static propTypes = {
		settings: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired,
	};

	onSelfExclusionChange(event) {
		const key = event.target.id;		// code duplication, should be refactored into some mixin
		const val = event.target.value;
		const obj = {};
		obj[key] = val;
		this.setState(obj);
	}

	tryUpdate() {
		const state = this.state || {};
		const { settings } = this.props;
		const req = {
			max_balance: (state.MAXCASHBAL) ? state.MAXCASHBAL : settings.max_balance,
			max_turnover: (state.DAILYTURNOVERLIMIT) ? state.DAILYTURNOVERLIMIT : settings.max_turnover,
			max_losses: (state.DAILYLOSSLIMIT) ? state.DAILYLOSSLIMIT : settings.max_losses,
			max_7day_turnover: (state['7DAYTURNOVERLIMIT']) ? state['7DAYTURNOVERLIMIT'] : settings.max_7day_turnover,
			max_7day_losses: (state['7DAYLOSSLIMIT']) ? state['7DAYLOSSLIMIT'] : settings.max_7day_losses,
			max_30day_turnover: (state['30DAYTURNOVERLIMIT'])
									? state['30DAYTURNOVERLIMIT']
									: settings.max_30day_turnover,
			max_30day_losses: (state['30DAYLOSSLIMIT']) ? state['30DAYLOSSLIMIT'] : settings.max_30day_losses,
			max_open_bets: (state.MAXOPENPOS) ? state.MAXOPENPOS : settings.max_open_bets,
			session_duration_limit: (state.SESSIONDURATION) ? state.SESSIONDURATION : settings.session_duration_limit,
			exclude_until: (state.EXCLUDEUNTIL) ? state.EXCLUDEUNTIL : settings.exclude_until,
		};

		LiveData.api.setSelfExclusion(req).then(
				response => {
				if (response.set_self_exclusion === 1) {
					this.actions.updateSettingFields(req);
				} else {
					SettingsSelfExclusion.handleUpdateError(response);
				}
			},
				response => {
					SettingsSelfExclusion.handleUpdateError(response);
			}
		);
	}

	render() {
		const { settings } = this.props;
		return (
			<div className="mobile-form">
				<InputGroup
					id="MAXCASHBAL"
					label="Maximum account cash balance"
					type="number"
					hint="Once this limit is reached, you may no longer deposit."
					defaultValue={settings.max_balance}
					onChange={::this.onSelfExclusionChange}
				/>
				<InputGroup
					id="DAILYTURNOVERLIMIT"
					label="Daily turnover limit"
					type="number"
					hint="Maximum aggregate contract purchases per day."
					defaultValue={settings.max_turnover}
					onChange={::this.onSelfExclusionChange}
				/>
				<InputGroup
					id="DAILYLOSSLIMIT"
					label="Daily limit on losses"
					type="number"
					hint="Maximum aggregate loss per day."
					defaultValue={settings.max_losses}
					onChange={::this.onSelfExclusionChange}
				/>
				<InputGroup
					id="7DAYTURNOVERLIMIT"
					label="7-day turnover limit"
					type="number"
					hint="Maximum aggregate contract purchases over a 7-day period."
					defaultValue={settings.max_7day_turnover}
					onChange={::this.onSelfExclusionChange}
				/>
				<InputGroup
					id="7DAYLOSSLIMIT"
					label="7-day limit on losses"
					type="number"
					hint="Maximum aggregate loss over a 7-day period."
					defaultValue={settings.max_7day_losses}
					onChange={::this.onSelfExclusionChange}
				/>
				<InputGroup
					id="30DAYTURNOVERLIMIT"
					label="30-day turnover limit"
					type="number"
					hint="Maximum aggregate contract purchases over a 30-day period."
					defaultValue={settings.max_30day_turnover}
					onChange={::this.onSelfExclusionChange}
				/>
				<InputGroup
					id="30DAYLOSSLIMIT"
					label="30-day limit on losses"
					type="number"
					hint="Maximum aggregate loss over a 30-day period."
					defaultValue={settings.max_30day_losses}
					onChange={::this.onSelfExclusionChange}
				/>
				<InputGroup
					id="MAXOPENPOS"
					label="Maximum number of open positions"
					type="number"
					defaultValue={settings.max_open_bets}
					onChange={::this.onSelfExclusionChange}
				/>
				<InputGroup
					id="SESSIONDURATION"
					label="Session duration limit, in minutes"
					type="number"
					hint="You will be automatically logged out after such time."
					defaultValue={settings.session_duration_limit}
					onChange={::this.onSelfExclusionChange}
				/>
				<InputGroup
					id="EXCLUDEUNTIL"
					label="Exclude me from the website until"
					type="text"
					hint="Please enter date in the format YYYY-MM-DD."
					defaultValue={settings.exclude_until}
					onChange={::this.onSelfExclusionChange}
				/>
				<Button
					text="Update"
					onClick={::this.tryUpdate}
				/>
			</div>
		);
	}
}
