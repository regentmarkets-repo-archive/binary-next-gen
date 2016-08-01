import React, { PropTypes, PureComponent } from 'react';
import { M, Button, InputGroup } from 'binary-components';
import { showError } from 'binary-utils';
import { actions } from '../_store';
import States from './States';
import ErrorMsg from 'binary-components/lib/ErrorMsg';
import showInfo from 'binary-utils/lib/showInfo';
import * as LiveData from '../_data/LiveData';

export default class SettingsAddress extends PureComponent {

	static propTypes = {
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
        const { country_code } = this.props;
        actions.getStatesForCountry(country_code);
    }

	onEntryChange = e =>
		this.setState({ [e.target.id]: e.target.value });

	tryUpdate = () => {
		const { address_line_1, address_line_2, address_city, address_state,
			address_postcode, phone } = this.state;
		const updateData = {
			address_line_1,
			address_line_2,
			address_city,
			address_state,
			address_postcode,
			phone,
		};

		if (phone.length < 6) {
			this.setState({ phoneError: 'You should enter between 6-35 characters.' });
		} else if (phone.match(/[a-z]/i)) {
			this.setState({ phoneError: 'Only numbers, space, - are allowed.' });
		} else if (address_line_1) {
			this.setState({ phoneError: '' });
			LiveData.api.setAccountSettings(updateData).then(() => {
					actions.updateSettingFields(this.state);
					showInfo('Settings updated');
				}).catch(response => {
					showError(response.error.message);
				}
			);
		}
	}

	render() {
		const { states } = this.props;
		const { address_line_1, address_line_2, address_city, address_state,
			address_postcode, country_code, phone, phoneError } = this.state;
		return (
			<div className="settings-address">
				<legend>
					<M m="Address" />
				</legend>
				<InputGroup
					id="address_line_1"
					type="text"
					label="Address"
					value={address_line_1}
					onChange={this.onEntryChange}
				/>
				{!address_line_1 && <ErrorMsg text="This field is required." />}
				<InputGroup
					id="address_line_2"
					type="text"
					label=" "
					value={address_line_2}
					onChange={this.onEntryChange}
				/>
				<InputGroup
					id="address_city"
					type="text"
					label="Town/City"
					defaultValue={address_city}
					onChange={this.onEntryChange}
				/>
				<States
					id="address_state"
					country={country_code}
					states={states}
					onChange={this.onEntryChange}
					selected={address_state}
				/>
				<InputGroup
					id="address_postcode"
					type="text"
					label="Postal Code / ZIP"
					defaultValue={address_postcode}
					onChange={this.onEntryChange}
				/>
				<InputGroup
					id="phone"
					type="tel"
					label="Telephone"
					defaultValue={phone}
					onChange={this.onEntryChange}
				/>
				{phoneError && <ErrorMsg text={phoneError} />}
				<Button
					text="Update"
					onClick={this.tryUpdate}
				/>
			</div>
		);
	}
}
