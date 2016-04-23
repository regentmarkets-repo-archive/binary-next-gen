import React, { PropTypes, Component } from 'react';
import M from '../_common/M';
import Button from '../_common/Button';
import States from '../_common/States';
import InputGroup from '../_common/InputGroup';
import TextAreaGroup from '../_common/TextAreaGroup';
import * as LiveData from '../_data/LiveData';

export default class SettingsAddress extends Component {
	constructor(props) {
		super(props);
		const { settings } = props;
		const addressString = settings.address_line_2
			? (`${settings.address_line_1} ${settings.address_line_2}`)
			: settings.address_line_1;
		this.state = {
			address: addressString,
			city: settings.address_city,
			AddressState: settings.address_state,
			postcode: settings.address_postcode,
			tel: settings.phone,
		};
	}

	static propTypes = {
		actions: PropTypes.object.isRequired,
		settings: PropTypes.object.isRequired,
	};

	static handleUpdateError() {
		// if (response.code === 'InputValidationFailed') {
		// 	const errorDetails = Object.keys(response.details)
		// 		.filter(key => response.details[key])
		// 		.map(key => `${key} ${response.details[key]}`)
		// 		.join('\n');
		// }
	}

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
			address_line_1: state.address,
			address_city: state.city,
			address_state: state.AddressState,
			address_postcode: state.postcode,
			phone: state.tel,
		};
		LiveData.api.setAccountSettings(req).then(
			response => {
				if (response.set_settings === 1) {
					this.props.actions.updateSettingFields(req);
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
		const { settings } = this.props;
		const addressString = settings.address_line_2
			? (`${settings.address_line_1} ${settings.address_line_2}`)
			: settings.address_line_1;

		return (
			<div className="mobile-form">
				<legend>
					<M m="Location" />
				</legend>
				<TextAreaGroup
					id="address"
					label="Address"
					value={addressString}
					onChange={::this.onAddressChange}
				/>
				<InputGroup
					id="city"
					type="text"
					label="Town/City"
					defaultValue={settings.address_city}
					onChange={::this.onAddressChange}
				/>
				<States
					id="AddressState"
					country={settings.country_code}
					onChange={::this.onAddressChange}
					selected={settings.address_state}
				/>
				<InputGroup
					id="postcode"
					type="text"
					label="Postal Code / ZIP"
					defaultValue={settings.address_postcode}
					onChange={::this.onAddressChange}
				/>
				<InputGroup
					id="tel"
					type="tel"
					label="Telephone"
					defaultValue={settings.phone}
					onChange={::this.onAddressChange}
				/>
				<Button
					text="Update"
					onClick={::this.tryUpdate}
				/>
			</div>
		);
	}
}
