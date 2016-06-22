import React, { PropTypes, Component } from 'react';
import M from 'binary-components/lib/M';
import Button from 'binary-components/lib/Button';
import States from './States';
import InputGroup from 'binary-components/lib/InputGroup';
import TextAreaGroup from 'binary-components/lib/TextAreaGroup';
import * as LiveData from '../_data/LiveData';

export default class SettingsAddress extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		address_line_1: PropTypes.string.isRequired,
		address_line_2: PropTypes.string.isRequired,
		address_postcode: PropTypes.string.isRequired,
		address_city: PropTypes.string.isRequired,
		city: PropTypes.string.isRequired,
		country_code: PropTypes.string.isRequired,
		address_state: PropTypes.string.isRequired,
		postcode: PropTypes.string.isRequired,
		phone: PropTypes.string.isRequired,
	};

	// constructor(props) {
	// 	super(props);
	// 	// this.state = {
	// 	// 	address: addressString,
	// 	// 	city: settings.address_city,
	// 	// 	addressState: settings.address_state,
	// 	// 	postcode: settings.address_postcode,
	// 	// 	tel: settings.phone,
	// 	// };
	// }

	onAddressChange = event => {
		const { id, value } = event.target;

		this.setState({
			[id]: value,
		});
	}

	tryUpdate = () => {
		const state = this.state || {};
		const req = {
			address_line_1: state.address,
			address_city: state.city,
			address_state: state.addressState,
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
		const { address_line_1, address_line_2, address_city, address_state,
			address_postcode, country_code, phone } = this.props;

		return (
			<div className="mobile-form settings-container">
				<legend>
					<M m="Location" />
				</legend>
				<InputGroup
					id="address1"
					label="Address1"
					value={address_line_1}
					onChange={this.onAddressChange}
				/>
				<InputGroup
					id="address2"
					label="Address2"
					value={address_line_2}
					onChange={this.onAddressChange}
				/>
				<InputGroup
					id="city"
					type="text"
					label="Town/City"
					defaultValue={address_city}
					onChange={this.onAddressChange}
				/>
				<States
					id="address-state"
					country={country_code}
					onChange={this.onAddressChange}
					selected={address_state}
				/>
				<InputGroup
					id="postcode"
					type="text"
					label="Postal Code / ZIP"
					defaultValue={address_postcode}
					onChange={this.onAddressChange}
				/>
				<InputGroup
					id="tel"
					type="tel"
					label="Telephone"
					defaultValue={phone}
					onChange={this.onAddressChange}
				/>
				<Button
					text="Update"
					onClick={this.tryUpdate}
				/>
			</div>
		);
	}
}
