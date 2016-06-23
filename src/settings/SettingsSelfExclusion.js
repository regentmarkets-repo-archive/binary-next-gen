import React, { PropTypes, Component } from 'react';
import Button from 'binary-components/lib/Button';
import InputGroup from 'binary-components/lib/InputGroup';
import * as LiveData from '../_data/LiveData';

export default class SettingsSelfExclusion extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		max_balance: PropTypes.number.isRequired,
		max_turnover: PropTypes.number.isRequired,
		max_losses: PropTypes.number.isRequired,
		max_7day_turnover: PropTypes.number.isRequired,
		max_7day_losses: PropTypes.number.isRequired,
		max_30day_turnover: PropTypes.number.isRequired,
		max_30day_losses: PropTypes.number.isRequired,
		max_open_bets: PropTypes.number.isRequired,
		session_duration_limit: PropTypes.number.isRequired,
		exclude_until: PropTypes.number.isRequired,
	};

	onSelfExclusionChange = event => {
		const { id, value } = event.target;
		this.setState({
			[id]: value,
		});
	}

	tryUpdate = () => {
		// const { max_balance, max_turnover } = this.props;
		// const { MAXCASHBAL, DAILYTURNOVERLIMIT } = this.props;
		//
		// const req = {
		// 	max_balance: MAXCASHBAL || max_balance,
		// 	max_turnover: DAILYTURNOVERLIMIT || max_turnover,
		// 	max_losses: (state.DAILYLOSSLIMIT) ? state.DAILYLOSSLIMIT : settings.max_losses,
		// 	max_7day_turnover: (state['7DAYTURNOVERLIMIT']) ? state['7DAYTURNOVERLIMIT'] : settings.max_7day_turnover,
		// 	max_7day_losses: (state['7DAYLOSSLIMIT']) ? state['7DAYLOSSLIMIT'] : settings.max_7day_losses,
		// 	max_30day_turnover: (state['30DAYTURNOVERLIMIT'])
		// 							? state['30DAYTURNOVERLIMIT']
		// 							: settings.max_30day_turnover,
		// 	max_30day_losses: (state['30DAYLOSSLIMIT']) ? state['30DAYLOSSLIMIT'] : settings.max_30day_losses,
		// 	max_open_bets: (state.MAXOPENPOS) ? state.MAXOPENPOS : settings.max_open_bets,
		// 	session_duration_limit: (state.SESSIONDURATION) ? state.SESSIONDURATION : settings.session_duration_limit,
		// 	exclude_until: (state.EXCLUDEUNTIL) ? state.EXCLUDEUNTIL : settings.exclude_until,
		// };
		//
		// LiveData.api.setSelfExclusion(req).then(
		// 		response => {
		// 		if (response.set_self_exclusion === 1) {
		// 			this.actions.updateSettingFields(req);
		// 		} else {
		// 			SettingsSelfExclusion.handleUpdateError(response);
		// 		}
		// 	},
		// 		response => {
		// 			SettingsSelfExclusion.handleUpdateError(response);
		// 	}
		// );
	}

	render() {
		const { max_balance, max_turnover, max_losses, max_7day_turnover,
			max_7day_losses, max_30day_turnover, max_30day_losses, max_open_bets,
			session_duration_limit, exclude_until } = this.props;

		return (
			<div className="settings-self-exclusion settings-container">
				<InputGroup
					id="MAXCASHBAL"
					label="Maximum account cash balance"
					type="number"
					hint="Once this limit is reached, you may no longer deposit."
					defaultValue={max_balance}
					onChange={this.onSelfExclusionChange}
				/>
				<InputGroup
					id="DAILYTURNOVERLIMIT"
					label="Daily turnover limit"
					type="number"
					hint="Maximum aggregate contract purchases per day."
					defaultValue={max_turnover}
					onChange={this.onSelfExclusionChange}
				/>
				<InputGroup
					id="DAILYLOSSLIMIT"
					label="Daily limit on losses"
					type="number"
					hint="Maximum aggregate loss per day."
					defaultValue={max_losses}
					onChange={this.onSelfExclusionChange}
				/>
				<InputGroup
					id="7DAYTURNOVERLIMIT"
					label="7-day turnover limit"
					type="number"
					hint="Maximum aggregate contract purchases over a 7-day period."
					defaultValue={max_7day_turnover}
					onChange={this.onSelfExclusionChange}
				/>
				<InputGroup
					id="7DAYLOSSLIMIT"
					label="7-day limit on losses"
					type="number"
					hint="Maximum aggregate loss over a 7-day period."
					defaultValue={max_7day_losses}
					onChange={this.onSelfExclusionChange}
				/>
				<InputGroup
					id="30DAYTURNOVERLIMIT"
					label="30-day turnover limit"
					type="number"
					hint="Maximum aggregate contract purchases over a 30-day period."
					defaultValue={max_30day_turnover}
					onChange={this.onSelfExclusionChange}
				/>
				<InputGroup
					id="30DAYLOSSLIMIT"
					label="30-day limit on losses"
					type="number"
					hint="Maximum aggregate loss over a 30-day period."
					defaultValue={max_30day_losses}
					onChange={this.onSelfExclusionChange}
				/>
				<InputGroup
					id="MAXOPENPOS"
					label="Maximum number of open positions"
					type="number"
					defaultValue={max_open_bets}
					onChange={this.onSelfExclusionChange}
				/>
				<InputGroup
					id="SESSIONDURATION"
					label="Session duration limit, in minutes"
					type="number"
					hint="You will be automatically logged out after such time."
					defaultValue={session_duration_limit}
					onChange={this.onSelfExclusionChange}
				/>
				<InputGroup
					id="EXCLUDEUNTIL"
					label="Exclude me from the website until"
					type="text"
					hint="Please enter date in the format YYYY-MM-DD."
					defaultValue={exclude_until}
					onChange={this.onSelfExclusionChange}
				/>
				<Button
					text="Update"
					onClick={this.tryUpdate}
				/>
			</div>
		);
	}
}
