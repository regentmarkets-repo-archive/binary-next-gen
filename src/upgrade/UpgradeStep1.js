import React from 'react';
import DateOfBirth from '../_common/DateOfBirth';

export default class UpgradeStep1 extends React.Component {

	render() {
		return (
			<div>
				<p>
					<select id="mrms" name="mrms">
						<option value="Mr">Mr</option>
						<option value="Mrs">Mrs</option>
						<option value="Ms">Ms</option>
						<option value="Miss">Miss</option>
						<option value="Dr">Dr</option>
						<option value="Prof">Prof</option>
					</select>
					<input name="fname" placeholder="First name" type="text" />
					<input name="lname" placeholder="Family name" type="text" />
				</p>
				<p>
					<input name="Email" placeholder="Email" type="email" />
				</p>
				<p>
					<label htmlFor="dobdd">Date of birth</label>
				</p>
				<p>
					<DateOfBirth/>
				</p>
			</div>
		);
	}
}
