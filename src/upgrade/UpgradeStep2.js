import React, { Component } from 'react';
import M from '../_common/M';
import Button from '../_common/Button';
import States from '../_common/States';
import ErrorMsg from '../_common/ErrorMsg';
import Countries from '../_common/Countries';

export default class UpgradeStep2 extends Component {
	constructor(props) {
		super(props);
		this.state = { showErr: false };
	}

	static propTypes = {
		addressState: React.PropTypes.string.isRequired,
		addressCity: React.PropTypes.string.isRequired,
		addressPostcode: React.PropTypes.string.isRequired,
		addressLine1: React.PropTypes.string.isRequired,
		addressLine2: React.PropTypes.string,
		phone: React.PropTypes.string.isRequired,
		actions: React.PropTypes.object.isRequired,
		residence: React.PropTypes.string.isRequired,
	};

	cityValid(city) {
		return city.length > 0;
	}

	postcodeValid(postcode) {
		return /^[^+]{0,20}$/.test(postcode);
	}

	address1Valid(address1) {
		return address1.length > 0 && address1.length <= 70;
	}

	phoneValid(phone) {
		return /^\+?[0-9\s]{6,35}$/.test(phone);
	}

	previousStep(e) {
		e.preventDefault();
		this.props.actions.upgradeFieldUpdate('activeStep', 0);
	}

	nextStep(e) {
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
			this.props.actions.upgradeFieldUpdate('activeStep', 2);
		}
	}

	countryChange(e) {
		this.props.actions.upgradeFieldUpdate('residence', e.target.value);
	}

	stateChange(e) {
		this.props.actions.upgradeFieldUpdate('addressState', e.target.value);
	}

	cityChange(e) {
		this.setState({ showErr: true });
		this.props.actions.upgradeFieldUpdate('addressCity', e.target.value);
	}

	postcodeChange(e) {
		this.props.actions.upgradeFieldUpdate('addressPostcode', e.target.value);
	}

	address1Change(e) {
		this.setState({ showErr: true });
		this.props.actions.upgradeFieldUpdate('addressLine1', e.target.value);
	}

	address2Change(e) {
		this.setState({ showErr: true });
		this.props.actions.upgradeFieldUpdate('addressLine2', e.target.value);
	}

	phoneChange(e) {
		this.setState({ showErr: true });
		this.props.actions.upgradeFieldUpdate('phone', e.target.value);
	}

	render() {
		const { addressCity, addressPostcode, addressLine1, addressLine2, phone, residence, addressState } = this.props;
		const cityValid = this.cityValid(addressCity);
		const postcodeValid = this.postcodeValid(addressPostcode);
		const address1Valid = this.address1Valid(addressLine1);
		const phoneValid = this.phoneValid(phone);
		const { showErr } = this.state;

		return (
			<div>
				<p>
					<label><M m="Home Address" /></label>
				</p>
				<p>
					<Countries onChange={::this.countryChange} value={residence} />
					<States country={residence} onChange={::this.stateChange} value={addressState} />
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
						onChange={::this.cityChange}
					/>
					<input
						name="AddressPostcode"
						value={addressPostcode}
						placeholder="Postal Code / ZIP"
						type="text"
						maxLength="20"
						onChange={::this.postcodeChange}
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
						onChange={::this.address1Change}
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
						onChange={::this.address2Change}
					/>
				</p>
				<p>
					<input
						name="Tel"
						value={phone}
						placeholder="Telephone"
						type="tel"
						maxLength="35"
						onChange={::this.phoneChange}
					/>
				</p>
				<ErrorMsg
					shown={showErr && !phoneValid}
					text="Phone number must within 6-35 digits"
				/>
				<p>
					<Button
						text="Back"
						onClick={::this.previousStep}
					/>
					<Button
						text="Next"
						onClick={::this.nextStep}
					/>
				</p>
			</div>
		);
	}
}
