import React, { PureComponent } from 'react';
import approve from 'approvejs';
import { Legend, Button, InputGroup, ErrorMsg, ServerErrorMsg } from 'binary-components';
import { actions } from '../_store';
import States from './States';
import UpdateNotice from '../containers/UpdateNotice';
import * as LiveData from '../_data/LiveData';

export default class SettingsAddress extends PureComponent {

  props: {
    address_line_1: string,
    address_line_2: string,
    address_city: string,
    address_state: string,
    country_code: string,
    address_postcode: string,
    phone: string,
    states: any[],
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

    this.result = {};

    this.rules = {
      address_line_1: {
        stop: true,
        required: {
          required: true,
          message: 'This field is required',
        },
        validateAddress: true,
      },
      address_line_2: {
        stop: true,
        validateAddress: true,
      },
      address_city: {
        stop: true,
        required: {
          required: true,
          message: 'This field is required',
        },
        validateGeneral: true,
			},
      address_state: {
        required: {
          required: true,
          message: 'This field is required',
        },
			},
      address_postcode: {
        stop: true,
        format: {
          regex: /^([a-zA-Z\d-\s])*$/,
					message: 'Only letters, numbers, space, and hyphen are allowed.',
				},
			},
      phone: {
        stop: true,
        required: {
          required: true,
          message: 'This field is required',
        },
        format: {
          regex: /^\+?[0-9\s]*$/,
          message: 'Only numbers and spaces are allowed.',
        },
			},
    };

    this.validateAddress = {
      message: 'Only letters, numbers, space, hyphen, period, and apostrophe are allowed.',
      validate(value) {
				/*eslint-disable */
        return !/[`~!#$%^&*)(_=+\[}{\]\\";:\?><|]+/.test(value);
				/*eslint-enable */
      },
    };

    this.validateGeneral = {
      message: 'Only letters, space, hyphen, period, and apostrophe are allowed.',
			validate(value) {
				/*eslint-disable */
        return !/[`~!@#$%^&*)(_=+\[}{\]\\\/";:\?><,|\d]+/.test(value);
				/*eslint-enable */
			},
		};

    approve.addTest(this.validateAddress, 'validateAddress');
    approve.addTest(this.validateGeneral, 'validateGeneral');
  }

  componentWillMount() {
    const { country_code } = this.props;
    actions.getStatesForCountry(country_code);
  }

  onEntryChange = (e: SyntheticEvent) => {
    this.setState({ [e.target.id]: e.target.value });
    this.setState({ hasError: false });
    this.result[e.target.id] = approve.value(e.target.value, this.rules[e.target.id]);
  }

  onFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (this.allRequiredDataFilled && !Object.keys(this.result).some(key => !this.result[key].approved)) {
      this.performUpdateSettings();
		} else {
      this.setState({ hasError: true });
		}
  }

  performUpdateSettings = async () => {
    const { address_line_1, address_line_2, address_city, address_state,
      address_postcode, phone } = this.state;

    try {
      await LiveData.api.setAccountSettings({
        address_line_1,
        address_line_2,
        address_city,
        address_state,
        address_postcode,
        phone,
      });
      this.setState({ success: true });
      setTimeout(() => this.setState({ success: false }), 3000);
      LiveData.api.getAccountSettings();
    } catch (e) {
      this.setState({ serverError: e.error.error.message });
    }
  }

  render() {
    const { states } = this.props;
    const { address_line_1, address_line_2, address_city, address_state,
      address_postcode, country_code, phone, serverError, success, hasError } = this.state;

    this.allRequiredDataFilled = address_line_1 && address_city && phone;

    return (
			<form className="settings-address" onSubmit={this.onFormSubmit}>
        {serverError && <ServerErrorMsg text={serverError} />}
        {hasError && <ErrorMsg text="Please fill the form with valid values" />}
				<UpdateNotice text="Address updated" show={success} />
				<Legend text="Address" />
				<InputGroup
					id="address_line_1"
					type="text"
					label="Address"
					maxLength="70"
					defaultValue={address_line_1}
					onChange={this.onEntryChange}
				/>
        {this.result.address_line_1 && this.result.address_line_1.errors && <ErrorMsg text={this.result.address_line_1.errors[0]} />}
				<InputGroup
					id="address_line_2"
					type="text"
					label=" "
					maxLength="70"
					defaultValue={address_line_2}
					onChange={this.onEntryChange}
				/>
        {this.result.address_line_2 && this.result.address_line_2.errors && <ErrorMsg text={this.result.address_line_2.errors[0]} />}
				<InputGroup
					id="address_city"
					type="text"
					label="Town/City"
					maxLength="35"
					defaultValue={address_city}
					onChange={this.onEntryChange}
				/>
        {this.result.address_city && this.result.address_city.errors && <ErrorMsg text={this.result.address_city.errors[0]} />}
				<States
					id="address_state"
					country={country_code}
					states={states}
					onChange={this.onEntryChange}
					selected={address_state}
				/>
        {this.result.address_state && this.result.address_state.errors && <ErrorMsg text={this.result.address_state.errors[0]} />}
				<InputGroup
					id="address_postcode"
					type="text"
					label="Postal Code / ZIP"
					maxLength="20"
					defaultValue={address_postcode}
					onChange={this.onEntryChange}
				/>
        {this.result.address_postcode && this.result.address_postcode.errors && <ErrorMsg text={this.result.address_postcode.errors[0]} />}
				<InputGroup
					id="phone"
					type="tel"
					label="Telephone"
					maxLength="35"
					defaultValue={phone}
					onChange={this.onEntryChange}
				/>
        {this.result.phone && this.result.phone.errors && <ErrorMsg text={this.result.phone.errors[0]} />}
				<Button
					text="Update"
					onClick={this.tryUpdate}
				/>
			</form>
    );
  }
}
