import React from "react";
import Countries from "./Countries";

export default class SignupStep2 extends React.Component {

	render() {
		return (
	  		<div>
		    	<p className='step2'>
		      		<label>Home Address</label>
		    	</p>
			    <p className='step2'>
			      	<Countries/>
			      	<select id='AddressState' name='AddressState'>
			        	<option value=''>State/Province</option>
			        	<option value='Some'>Some</option>
			      	</select>
			    </p>
			    <p className='step2'>
			      	<input id='AddressTown' name='AddressTown' placeholder='Town/City' type='text'/>
			      	<input id='AddressPostcode' name='AddressPostcode' placeholder='Postal Code / ZIP' type='text'/>
			    </p>
			    <p className='step2'>
			      	<input id='Address1' name='Address1' placeholder='First line' type='text'/>
			    </p>
			    <p className='step2'>
			      	<input id='Address2' name='Address2' placeholder='Second line' type='text'/>
			    </p>
			    <p className='step2'>
			      	<input id='Tel' name='Tel' placeholder='Telephone' type='tel'/>
			    </p>
		    </div>
		)
	}
}
