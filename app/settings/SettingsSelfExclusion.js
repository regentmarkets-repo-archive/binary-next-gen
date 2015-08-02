import React from 'react';

export default class SettingsSelfExclusion extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {

		return (
			<div>
				<label for="MAXCASHBAL">Maximum account cash balance</label>
				<input id="MAXCASHBAL" name="MAXCASHBAL" type="number" />
				<p class="hint">Once this limit is reached, you may no longer deposit.</p>
				<label for="DAILYTURNOVERLIMIT">Daily turnover limit</label>
				<input id="DAILYTURNOVERLIMIT" type="number" />
				<p class="hint">Maximum aggregate contract purchases per day.</p>
				<p class="errorfield" id="errorDAILYTURNOVERLIMIT"></p>
				<label for="DAILYLOSSLIMIT">Daily limit on losses</label>
				<input class=" text" id="DAILYLOSSLIMIT" name="DAILYLOSSLIMIT" type="text" />
				<p class="hint">Maximum aggregate loss per day.</p>
				<label for="7DAYTURNOVERLIMIT">7-day turnover limit</label>
				<input class=" text" id="7DAYTURNOVERLIMIT" name="7DAYTURNOVERLIMIT" type="text" />
				<p class="hint">Maximum aggregate contract purchases over a 7-day period.</p>
				<label for="7DAYLOSSLIMIT">7-day limit on losses</label>
				<input class=" text" id="7DAYLOSSLIMIT" name="7DAYLOSSLIMIT" type="text" />
				<p class="hint">Maximum aggregate loss over a 7-day period.</p>
				<p class="errorfield" id="error7DAYLOSSLIMIT"></p>
				<label for="MAXOPENPOS">Maximum number of open positions</label>
				<input class=" text" id="MAXOPENPOS" name="MAXOPENPOS" type="text" />
				<label for="SESSIONDURATION">Session duration limit, in minutes</label>
				<input class=" text" id="SESSIONDURATION" name="SESSIONDURATION" type="text" />
				<p class="hint">You will be automatically logged out after such time.</p>
				<label for="EXCLUDEUNTIL">Exclude me from the website until</label>
				<input class="text hasDatepicker" id="EXCLUDEUNTIL" name="EXCLUDEUNTIL" type="text" />
				<p class="hint">Please enter date in the format YYYY-MM-DD.</p>
				<button>Update Settings</button>
			</div>
		);
	}
}
