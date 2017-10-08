import React, { PureComponent } from 'react';
import head from 'lodash.head';
import validate from 'validate.js';
import { Legend, Button, InputGroup, ErrorMsg, ServerErrorMsg, SelectGroup, MultiSelectGroup } from 'binary-components';
import States from './States';
import UpdateNotice from '../containers/UpdateNotice';
import * as LiveData from '../_data/LiveData';
import { getConstraints } from './SettingsAddress.validation.config';

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
		account_opening_reason: string,
    residenceList: any[],
    tax_residence: string,
    tax_identification_number: string,
	};

	constructor(props) {
		super(props);

		this.state = {
			address_line_1: props.address_line_1 || '',
			address_line_2: props.address_line_2 || '',
			address_city: props.address_city || '',
			address_state: props.address_state || '',
			address_postcode: props.address_postcode || '',
			phone: props.phone || '',
			account_opening_reason: props.account_opening_reason || '',
      tax_residence: props.tax_residence || '',
      tax_identification_number: props.tax_identification_number || '',
			errors: {},
      touched: {
        address_line_1: false,
        address_line_2: false,
        address_city: false,
        address_state: false,
        address_postcode: false,
				phone: false,
				account_opening_reason: false,
				tax_residence: false,
        tax_identification_number: false,
			},
		};
	}

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        address_line_1: nextProps.address_line_1 || '',
        address_line_2: nextProps.address_line_2 || '',
        address_city: nextProps.address_city || '',
        address_state: nextProps.address_state || '',
        address_postcode: nextProps.address_postcode || '',
        phone: nextProps.phone || '',
        account_opening_reason: nextProps.account_opening_reason || '',
        tax_residence: nextProps.tax_residence || '',
        tax_identification_number: nextProps.tax_identification_number || '',
      });
    }
	}

  onEntryChange = (e: SyntheticEvent) =>
		this.setState({
			[e.target.id]: e.target.value,
			touched: { ...this.state.touched, [e.target.id]: true },
			hasError: false,
		}, () => {
		this.validateForm();
	});

  onTaxResidenceChange = (val) => this.setState({ tax_residence: val,
    /*eslint-disable */
    touched: { ...this.state.touched, 'tax_residence': true },
    /*eslint-enable */
    hasError: false,
  }, () => {
    this.validateForm();
  });

  validateForm = () => {
		this.constraints = getConstraints(this.props, this.state);
		this.setState({
			errors: validate(this.state, this.constraints, { format: 'grouped', fullMessages: false, cleanAttributes: false }) || {},
		});
	}

	onFormSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
    if (Object.keys(this.state.errors).length > 0) {
			this.setState({ hasError: true });
		} else {
			this.performUpdateSettings();
		}
	}

	performUpdateSettings = async () => {
		const { address_line_1, address_line_2, address_city, address_state,
			address_postcode, phone, account_opening_reason, tax_residence, tax_identification_number } = this.state;

		try {
			await LiveData.api.setAccountSettings({
				address_line_1,
				address_line_2,
				address_city,
				address_state,
				address_postcode,
				phone,
        account_opening_reason,
        tax_residence,
        tax_identification_number,
			});
			this.setState({ success: true });
			setTimeout(() => this.setState({ success: false }), 3000);
		} catch (e) {
			this.setState({ serverError: e.error.error.message });
		}
	}

	render() {
		const { states, residenceList } = this.props;
		const { address_line_1, address_line_2, address_city, address_state,
			address_postcode, country_code, phone, account_opening_reason, tax_residence, tax_identification_number, serverError, success, hasError, touched, errors } = this.state;
    const taxResidenceList = residenceList.slice();
    taxResidenceList.filter(props => {
      delete props.disabled;
      return true;
    });
		const accountOpeningReasonOptions = [
        {
          value: '',
          text: 'Please select',
          disabled: true,
        },
        {
          value: 'Speculative',
          text: 'Speculative'
        },
        {
          value: 'Income Earning',
          text: 'Income Earning'
        },
        {
          value: 'Hedging',
          text: 'Hedging'
        },
      ];

		return (
			<form className="settings-address" onSubmit={this.onFormSubmit}>
				{serverError && <ServerErrorMsg text={serverError} />}
        {hasError && <ErrorMsg text="Please fill the form with valid values" />}
				<UpdateNotice text="Profile updated" show={success} />
				<div className="input-row">
					<SelectGroup
						id="account_opening_reason"
						label="Account opening reason"
						value={account_opening_reason}
						options={accountOpeningReasonOptions}
						onChange={this.onEntryChange}
					/>
				</div>
        { touched.account_opening_reason && <ErrorMsg text={head((errors || {}).account_opening_reason)} /> }

				<Legend text="Address" />
				<InputGroup
					id="address_line_1"
					type="text"
					label="Address"
					value={address_line_1}
					onChange={this.onEntryChange}
				/>
				{touched.address_line_1 && <ErrorMsg text={head((errors || {}).address_line_1)} />}
				<InputGroup
					id="address_line_2"
					type="text"
					label=" "
					value={address_line_2}
					onChange={this.onEntryChange}
				/>
        {touched.address_line_2 && <ErrorMsg text={head((errors || {}).address_line_2)} />}
				<InputGroup
					id="address_city"
					type="text"
					label="Town/City"
					value={address_city}
					onChange={this.onEntryChange}
				/>
        {touched.address_city && <ErrorMsg text={head((errors || {}).address_city)} />}
				<States
					id="address_state"
					country={country_code}
					states={states}
					onChange={this.onEntryChange}
					selected={address_state}
				/>
        {touched.address_state && <ErrorMsg text={head((errors || {}).address_state)} />}
				<InputGroup
					id="address_postcode"
					type="text"
					label="Postal Code / ZIP"
					value={address_postcode}
					onChange={this.onEntryChange}
				/>
        {touched.address_postcode && <ErrorMsg text={head((errors || {}).address_postcode)} />}
				<InputGroup
					id="phone"
					type="tel"
					label="Telephone"
					value={phone}
					onChange={this.onEntryChange}
				/>
        {touched.phone && <ErrorMsg text={head((errors || {}).phone)} />}

				<Legend text="Tax information" />
				<div className="input-row">
					<MultiSelectGroup
						placeholder="Tax residence"
						className="multi-select"
						value={tax_residence}
						options={taxResidenceList}
						joinValues
						multi
						simpleValue
						searchable={false}
						labelKey="text"
						onChange={this.onTaxResidenceChange}
					/>
				</div>
        { touched.tax_residence && <ErrorMsg text={head((errors || {}).tax_residence)} /> }

				<div className="input-row">
					<InputGroup
						id="tax_identification_number"
						value={tax_identification_number}
						label="Tax identification number"
						maxLength="20"
						type="text"
						onChange={this.onEntryChange}
					/>
				</div>
        { touched.tax_identification_number && <ErrorMsg text={head((errors || {}).tax_identification_number)} /> }
				<Button
					text="Update"
					onClick={this.tryUpdate}
				/>
			</form>
		);
	}
}
