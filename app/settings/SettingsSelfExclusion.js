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
				<label htmlFor="MAXCASHBAL">Maximum account cash balance</label>
				<input id="MAXCASHBAL" name="MAXCASHBAL" type="number" />
				<p className="hint">Once this limit is reached, you may no longer deposit.</p>
				<label htmlFor="DAILYTURNOVERLIMIT">Daily turnover limit</label>
				<input id="DAILYTURNOVERLIMIT" type="number" />
				<p className="hint">Maximum aggregate contract purchases per day.</p>
				<p className="errorfield" id="errorDAILYTURNOVERLIMIT"></p>
				<label htmlFor="DAILYLOSSLIMIT">Daily limit on losses</label>
				<input className=" text" id="DAILYLOSSLIMIT" name="DAILYLOSSLIMIT" type="text" />
				<p className="hint">Maximum aggregate loss per day.</p>
				<label htmlFor="7DAYTURNOVERLIMIT">7-day turnover limit</label>
				<input className=" text" id="7DAYTURNOVERLIMIT" name="7DAYTURNOVERLIMIT" type="text" />
				<p className="hint">Maximum aggregate contract purchases over a 7-day period.</p>
				<label htmlFor="7DAYLOSSLIMIT">7-day limit on losses</label>
				<input className=" text" id="7DAYLOSSLIMIT" name="7DAYLOSSLIMIT" type="text" />
				<p className="hint">Maximum aggregate loss over a 7-day period.</p>
				<p className="errorfield" id="error7DAYLOSSLIMIT"></p>
				<label htmlFor="MAXOPENPOS">Maximum number of open positions</label>
				<input className=" text" id="MAXOPENPOS" name="MAXOPENPOS" type="text" />
				<label htmlFor="SESSIONDURATION">Session duration limit, in minutes</label>
				<input className=" text" id="SESSIONDURATION" name="SESSIONDURATION" type="text" />
				<p className="hint">You will be automatically logged out after such time.</p>
				<label htmlFor="EXCLUDEUNTIL">Exclude me from the website until</label>
				<input className="text hasDatepicker" id="EXCLUDEUNTIL" name="EXCLUDEUNTIL" type="text" />
				<p className="hint">Please enter date in the format YYYY-MM-DD.</p>
				<button>Update Settings</button>
			</div>
		);
	}
}
