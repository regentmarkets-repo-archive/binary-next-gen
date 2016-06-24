import React, { PropTypes, Component } from 'react';
import M from 'binary-components/lib/M';
import Button from 'binary-components/lib/Button';
import InputGroup from 'binary-components/lib/InputGroup';
import showError from 'binary-utils/lib/showError';
import States from './States';
import * as LiveData from '../_data/LiveData';

export default class SettingsAddress extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		address_line_1: PropTypes.string.isRequired,
		address_line_2: PropTypes.string.isRequired,
		address_city: PropTypes.string.isRequired,
		address_state: PropTypes.string.isRequired,
		country_code: PropTypes.string.isRequired,
		address_postcode: PropTypes.string.isRequired,
		phone: PropTypes.string.isRequired,
		states: PropTypes.array.isRequired,
	};

	constructor(props) {
		super(props);

		this.state = {
			address_line_1: props.address_line_1,
			address_line_2: props.address_line_2,
			address_city: props.address_city,
			address_state: props.address_state,
			address_postcode: props.address_postcode,
			phone: props.phone,
		};
	}

    componentWillMount() {
        const { actions, country_code } = this.props;
        actions.getStatesForCountry(country_code);
    }

	onAddressEntryChange = event => {
		const { id, value } = event.target;

		this.setState({
			[id]: value,
		});
	}

	tryUpdate = () => {
		LiveData.api.setAccountSettings(this.state).then(() => {
				this.props.actions.updateSettingFields(this.state);
			}).catch(response => {
				showError(response.error.message);
			}
		);
	}

	render() {
		const { actions, states } = this.props;
		const { address_line_1, address_line_2, address_city, address_state,
			address_postcode, country_code, phone } = this.state;

		return (
			<div className="settings-address">
				<legend>
					<M m="Address" />
				</legend>
				<InputGroup
					id="address_line_1"
					type="text"
					label="Address1"
					value={address_line_1}
					onChange={this.onAddressEntryChange}
				/>
				<InputGroup
					id="address_line_2"
					type="text"
					label="Address2"
					value={address_line_2}
					onChange={this.onAddressEntryChange}
				/>
				<InputGroup
					id="address_city"
					type="text"
					label="Town/City"
					defaultValue={address_city}
					onChange={this.onAddressEntryChange}
				/>
				<States
					id="address_state"
					actions={actions}
					country={country_code}
					states={states}
					onChange={this.onAddressEntryChange}
					selected={address_state}
				/>
				<InputGroup
					id="address_postcode"
					type="text"
					label="Postal Code / ZIP"
					defaultValue={address_postcode}
					onChange={this.onAddressEntryChange}
				/>
				<InputGroup
					id="phone"
					type="tel"
					label="Telephone"
					defaultValue={phone}
					onChange={this.onAddressEntryChange}
				/>
				<Button
					text="Update"
					onClick={this.tryUpdate}
				/>
			</div>
		);
	}
}
