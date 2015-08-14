import React from 'react';
import Countries from '../common/Countries';

export default class UpgradeStep2 extends React.Component {

	render() {
		return (
	  		<div>
		    	<p>
		      		<label>Home Address</label>
		    	</p>
				<p>
			      	<Countries/>
			      	<select name="AddressState">
			        	<option value="">State/Province</option>
			        	<option value="Some">Some</option>
			      	</select>
				</p>
				<p>
			      	<input name="AddressTown" placeholder="Town/City" type="text" />
			      	<input name="AddressPostcode" placeholder="Postal Code / ZIP" type="text" />
				</p>
				<p>
			      	<input name="Address1" placeholder="First line" type="text" />
				</p>
				<p>
			      	<input name="Address2" placeholder="Second line" type="text" />
				</p>
				<p>
			      	<input name="Tel" placeholder="Telephone" type="tel" />
				</p>
			</div>
		);
	}
}
