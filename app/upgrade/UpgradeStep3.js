import React from 'react';

export default class UpgradeStep3 extends React.Component {

	render() {
		return (
	  		<div>
				<p>
			      	<label>Security</label>
				</p>
				<p>
			      	<input name="chooseapassword" placeholder="Password" type="password" />
				</p>
				<p>
			      	<select name="secretquestion">
						<option value="">Secret question</option>
						<option value="Mother's maiden name">Mother's maiden name</option>
						<option value="Name of your pet">Name of your pet</option>
						<option value="Name of first love">Name of first love</option>
						<option value="Memorable town/city">Memorable town/city</option>
						<option value="Memorable date">Memorable date</option>
						<option value="Favourite dish">Favourite dish</option>
						<option value="Brand of first car">Brand of first car</option>
						<option value="Favourite artist">Favourite artist</option>
			      	</select>
			      	<input name="secretanswer" placeholder="Answer to secret question" type="text" />
				</p>
				<p>
			      	<label>
			        	<input name="tnc" type="checkbox"/>
		          		I have read and agree to the <a href="https://www.binary.com/terms-and-conditions" target="_blank">terms and conditions</a> of the site.
			      	</label>
				</p>
			</div>
		);
	}
}
