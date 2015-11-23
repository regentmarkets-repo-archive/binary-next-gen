import React from 'react';
import { InputGroup } from '../_common';

export default class SettingsSelfExclusion extends React.Component {

	static propTypes = {
		settings: React.PropTypes.object.isRequired,
	};

	render() {
		const {settings} = this.props;

		return (
			<div>
				<InputGroup
					id="MAXCASHBAL"
					label="Maximum account cash balance"
					type="number"
					hint="Once this limit is reached, you may no longer deposit."
					value={settings.max_balance} />
				<InputGroup
					id="DAILYTURNOVERLIMIT"
					label="Daily turnover limit"
					type="number"
					hint="Maximum aggregate contract purchases per day."
					value={settings.max_turnover} />
				<InputGroup
					id="DAILYLOSSLIMIT"
					label="Daily limit on losses"
					type="number"
					hint="Maximum aggregate loss per day."
					value={settings.max_losses} />
				<InputGroup
					id="7DAYTURNOVERLIMIT"
					label="7-day turnover limit"
					type="number"
					hint="Maximum aggregate contract purchases over a 7-day period."
					value={settings.max_7day_turnover} />
				<InputGroup
					id="7DAYLOSSLIMIT"
					label="7-day limit on losses"
					type="number"
					hint="Maximum aggregate loss over a 7-day period."
					value={settings.max_7day_losses} />
				<InputGroup
					id="MAXOPENPOS"
					label="Maximum number of open positions"
					type="number"
					value={settings.max_open_bets} />
				<InputGroup
					id="SESSIONDURATION"
					label="Session duration limit, in minutes"
					type="number"
					hint="You will be automatically logged out after such time."
					value={settings.session_duration_limit} />
				<InputGroup
					id="EXCLUDEUNTIL"
					label="Exclude me from the website until"
					type="text"
					hint="Please enter date in the format YYYY-MM-DD."
					value={settings.exclude_until} />

				<button>Update Settings</button>
			</div>
		);
	}
}
