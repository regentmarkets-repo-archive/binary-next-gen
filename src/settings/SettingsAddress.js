import React from 'react';
import InputGroup from '../_common/InputGroup';
import * as LiveData from '../_data/LiveData';
import SelectGroup from '../_common/SelectGroup';
import TextAreaGroup from '../_common/TextAreaGroup';

export default class SettingsAddress extends React.Component {

	static propTypes = {
		actions: React.PropTypes.object.isRequired,
		settings: React.PropTypes.object.isRequired,
	};

	static handleUpdateError(response) {
		if (response.code === 'InputValidationFailed') {
			let errorDetails;
			for (const k in response.details) {
				if (response.details.hasOwnProperty(k)) {
					errorDetails = errorDetails + `\n${k} ${response.details[k]}`;
				}
			}
			window.alert(errorDetails);
		}
	}

	static hardCodedStateCodes = [
		{
		value: '',
		text: 'Please select',
		},
		{
			value: 'AC',
			text: 'Aceh',
		},
		{
			value: 'BA',
			text: 'Bali',
		},
		{
			value: 'BB',
			text: 'Bangka Belitung',
		},
	];

	onAddressChange(event) {
		const key = event.target.id;
		const val = event.target.value;
		const obj = {};
		obj[key] = val;
		this.setState(obj);
	}

	tryUpdate() {
		const state = this.state || {};
		const req = {
			set_settings: 1,
			address_line_1: state.address,
			address_city: state.city,
			address_state: state.AddressState,
			address_postcode: state.postcode,
			phone: state.tel,
		};
		LiveData.api.send(req).then(
			response => {
				if (response.set_settings === 1) {
					delete req.set_settings;
					this.actions.updatePersonalAddress(req);
				} else {
					SettingsAddress.handleUpdateError(response);
				}
			},
			response => {
				SettingsAddress.handleUpdateError(response);
			}
		);
	}

	render() {
		const {settings} = this.props;
		const addressString = settings.address_line_2 ? (`${settings.address_line_1} ${settings.address_line_2}`) : settings.address_line_1;

		return (
			<div className="address-form">
				<legend>Location</legend>
				<TextAreaGroup
					id="address"
					label="Address"
					value={addressString}
					onChange={::this.onAddressChange} />
				<InputGroup
					id="city"
					type="text"
					label="Town/City"
					value={settings.address_city}
					onChange={::this.onAddressChange} />
				<SelectGroup
					id="AddressState"
					label="State/Province"
					value=""
					options={SettingsAddress.hardCodedStateCodes}
					onChange={::this.onAddressChange} />
				<InputGroup
					id="postcode"
					type="text"
					label="Postal Code / ZIP"
					value={settings.address_postcode}
					onChange={::this.onAddressChange} />
				<InputGroup
					id="tel"
					type="tel"
					label="Telephone"
					value={settings.phone}
					onChange={::this.onAddressChange} />

				<button onClick={::this.tryUpdate}>Update</button>
			</div>
		);
	}
}
