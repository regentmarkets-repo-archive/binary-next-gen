import React from 'react';
import InputGroup from '../_common/InputGroup';

export default () => (
	<div>
		<InputGroup id="MAXCASHBAL" label="Maximum account cash balance" type="number" hint="Once this limit is reached, you may no longer deposit."/>
		<InputGroup id="DAILYTURNOVERLIMIT" label="Daily turnover limit" type="number" hint="Maximum aggregate contract purchases per day."/>
		<InputGroup id="DAILYLOSSLIMIT" label="Daily limit on losses" type="number" hint="Maximum aggregate loss per day."/>
		<InputGroup id="7DAYTURNOVERLIMIT" label="7-day turnover limit" type="number" hint="Maximum aggregate contract purchases over a 7-day period."/>
		<InputGroup id="7DAYLOSSLIMIT" label="7-day limit on losses" type="number" hint="Maximum aggregate loss over a 7-day period."/>
		<InputGroup id="MAXOPENPOS" label="Maximum number of open positions" type="number"/>
		<InputGroup id="SESSIONDURATION" label="Session duration limit, in minutes" type="number" hint="You will be automatically logged out after such time."/>
		<InputGroup id="EXCLUDEUNTIL" label="Exclude me from the website until" type="text" hint="Please enter date in the format YYYY-MM-DD."/>

		<button>Update Settings</button>
	</div>
);
