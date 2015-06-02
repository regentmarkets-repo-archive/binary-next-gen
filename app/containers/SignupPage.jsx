import React from "react";
import { Link } from "react-router";
import DateOfBirth from "../components/DateOfBirth";
import Countries from "../components/Countries";

export default class SignupPage extends React.Component {
	static getProps() {
		return {};
	}
	render() {
		return (
	  		<form className='wide-form' id='real-account-form' method='post' novalidate=''>
		    	<p>
		      		<img className='form-logo'/>
		    	</p>
		    	<h3>Open Real Money Account</h3>
		    	<p className='step1'>
		      		<select id='mrms' name='mrms'>
		        		<option value='Mr'>Mr</option>
		        		<option value='Mrs'>Mrs</option>
		        		<option value='Ms'>Ms</option>
		        		<option value='Miss'>Miss</option>
		        		<option value='Dr'>Dr</option>
		        		<option value='Prof'>Prof</option>
		      		</select>
		      		<input id='fname' name='fname' placeholder='First name' type='text'/>
		      		<input id='lname' name='lname' placeholder='Family name' type='text'/>
		    	</p>
		    	<p className='step1'>
		      		<input id='email' name='Email' placeholder='Email' type='email'/>
		    	</p>
		    	<p className='step1'>
		      		<label for='dobdd'>Date of birth</label>
		    	</p>
		    	<p className='step1'>
		      		<DateOfBirth/>
		    	</p>
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
			    <p className='step3'>
			      	<label>Security</label>
			    </p>
			    <p className='step3'>
			      	<input name='chooseapassword' placeholder='Password' type='password'/>
			    </p>
			    <p className='step3'>
			      	<select id='secretquestion' name='secretquestion'>
				        <option value=''>Secret question</option>
				        <option value="Mother's maiden name">Mother's maiden name</option>
				        <option value='Name of your pet'>Name of your pet</option>
				        <option value='Name of first love'>Name of first love</option>
				        <option value='Memorable town/city'>Memorable town/city</option>
				        <option value='Memorable date'>Memorable date</option>
				        <option value='Favourite dish'>Favourite dish</option>
				        <option value='Brand of first car'>Brand of first car</option>
				        <option value='Favourite artist'>Favourite artist</option>
			      	</select>
			      	<input name='secretanswer' placeholder='Answer to secret question' type='text'/>
			    </p>
			    <p class='step3'>
			      	<label>
			        	<input id='tnc' name='tnc' type='checkbox'/>
		          		I have read and agree to the <a href='https://www.binary.com/c/c_template.cgi?filecode=legal&amp;amp;l=EN' target='_blank'>terms and conditions</a> of the site.
			      	</label>
			    </p>
			    <p>
			      	<button class='important' id='open-real-acount' value='Open Account'>Open Account</button>
			    </p>
		    </form>
		)
	}
}
