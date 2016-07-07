import React, { Component, PropTypes } from 'react';
import M from 'binary-components/lib/M';
import Button from 'binary-components/lib/Button';
import States from '../settings/States';
import ErrorMsg from 'binary-components/lib/ErrorMsg';
import Countries from 'binary-components/lib/Countries';
import { actions } from '../_store';

export default class UpgradeStep2 extends Component {

	static propTypes = {
		addressState: PropTypes.string.isRequired,
		addressCity: PropTypes.string.isRequired,
		addressPostcode: PropTypes.string.isRequired,
		addressLine1: PropTypes.string.isRequired,
		addressLine2: PropTypes.string,
		phone: PropTypes.string.isRequired,
		residence: PropTypes.string.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = { showErr: false };
	}

	onCountryChange = e =>
		actions.upgradeFieldUpdate('residence', e.target.value);

	onStateChange = e =>
		actions.upgradeFieldUpdate('addressState', e.target.value);

	onCityChange = e => {
		this.setState({ showErr: true });
		actions.upgradeFieldUpdate('addressCity', e.target.value);
	}

	onPostcodeChange = e => {
		actions.upgradeFieldUpdate('addressPostcode', e.target.value);
	}

	onAddress1Change = e => {
		this.setState({ showErr: true });
		actions.upgradeFieldUpdate('addressLine1', e.target.value);
	}

	onAddress2Change(e) {
		this.setState({ showErr: true });
		actions.upgradeFieldUpdate('addressLine2', e.target.value);
	}

	onPhoneChange(e) {
		this.setState({ showErr: true });
		actions.upgradeFieldUpdate('phone', e.target.value);
	}

	cityValid = city =>
		city.length > 0;

	postcodeValid = postcode =>
		/^[^+]{0,20}$/.test(postcode);

	address1Valid = address1 =>
		address1.length > 0 && address1.length <= 70;

	phoneValid = phone =>
		/^\+?[0-9\s]{6,35}$/.test(phone);

	previousStep = e => {
		e.preventDefault();
		actions.upgradeFieldUpdate('activeStep', 0);
	}

	nextStep = e => {
		e.preventDefault();
		this.setState({ showErr: true });
		const { addressCity, addressPostcode, addressLine1, phone, residence } = this.props;
		const cityValid = this.cityValid(addressCity);
		const postcodeValid = this.postcodeValid(addressPostcode);
		const address1Valid = this.address1Valid(addressLine1);
		const phoneValid = this.phoneValid(phone);
		if (cityValid &&
			postcodeValid &&
			address1Valid &&
			phoneValid &&
			residence) {
			actions.upgradeFieldUpdate('activeStep', 2);
		}
	}

	render() {
		const { addressCity, addressPostcode, addressLine1, addressLine2, phone, residence, addressState } = this.props;
		const cityValid = this.cityValid(addressCity);
		const postcodeValid = this.postcodeValid(addressPostcode);
		const address1Valid = this.address1Valid(addressLine1);
		const phoneValid = this.phoneValid(phone);
		const { showErr } = this.state;

		return (
			<form onSubmit={this.nextStep}>
				<p>
					<label><M m="Home Address" /></label>
				</p>
				<p>
					<Countries onChange={this.onCountryChange} value={residence} />
					<States country={residence} onChange={this.onStateChange} value={addressState} />
				</p>
				<ErrorMsg
					shown={showErr && !residence}
					text="Please choose your country"
				/>
				<p>
					<input
						name="AddressTown"
						value={addressCity}
						placeholder="Town/City"
						type="text"
						maxLength="35"
						onChange={this.onCityChange}
					/>
					<input
						name="AddressPostcode"
						value={addressPostcode}
						placeholder="Postal Code / ZIP"
						type="text"
						maxLength="20"
						onChange={this.onPostcodeChange}
					/>
				</p>
				<ErrorMsg
					shown={showErr && !cityValid}
					text="City must not be empty"
				/>
				<ErrorMsg
					shown={showErr && !postcodeValid}
					text="Postcode must not contain +"
				/>
				<p>
					<input
						name="Address1"
						value={addressLine1}
						placeholder="First line"
						type="text"
						maxLength="70"
						onChange={this.onAddress1Change}
					/>
				</p>
				<ErrorMsg
					shown={showErr && !address1Valid}
					text="Address must not be empty"
				/>
				<p>
					<input
						name="Address2"
						value={addressLine2}
						placeholder="Second line"
						type="text"
						maxLength="70"
						onChange={this.onAddress2Change}
					/>
				</p>
				<p>
					<input
						name="Tel"
						value={phone}
						placeholder="Telephone"
						type="tel"
						maxLength="35"
						onChange={this.onPhoneChange}
					/>
				</p>
				<ErrorMsg
					shown={showErr && !phoneValid}
					text="Phone number must within 6-35 digits"
				/>
				<p>
					<Button text="Back" onClick={this.previousStep} />
					<Button text="Next"	/>
				</p>
			</form>
		);
	}
}
