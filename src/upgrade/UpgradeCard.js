import React, { Component, PropTypes } from 'react';
import M from 'binary-components/lib/M';
import LogoSpinner from 'binary-components/lib/LogoSpinner';
import Legend from 'binary-components/lib/Legend';
import Button from 'binary-components/lib/Button';
import Option from 'binary-components/lib/Option';
import ErrorMsg from 'binary-components/lib/ErrorMsg';
import DateOfBirth from 'binary-components/lib/DateOfBirth';
import Countries from 'binary-components/lib/Countries';
import { api } from '../_data/LiveData';
import SecretQuestion from './SecretQuestion';

export default class UpgradeCard extends Component {

	static propTypes = {
		activeStep: PropTypes.number.isRequired,
		progress: PropTypes.bool.isRequired,
	};

	static contextTypes = {
		router: PropTypes.object.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = {
			validatedOnce: '',
			salutation: 'Mr',
			firstName: '',
			lastName: '',
			residence: '',
			addressCity: '',
			addressLine1: '',
			phone: '',
			secretQuestion: '',
			secretAnswer: '',
		};
	}

	componentWillReceiveProps(nextProps) {
		const { router } = this.context;
		if (nextProps.upgrade.get('success')) {
			router.push('/');
		}
	}

	onSalutationChange = e =>
		this.setState({ salutation: e.target.value });

	onFirstNameChange = e =>
		this.setState({ firstName: e.target.value });

	onLastNameChange = e =>
		this.setState({ lastName: e.target.value });

	onFirstNameValid = firstName =>
		/^[a-zA-Z\s'.-]{2,30}$/.test(firstName);

	onLastNameValid = lastName =>
		/^[a-zA-Z\s'.-]{2,30}$/.test(lastName);

	onDayChange = e =>
		this.setState({ day: e.target.value });

	onMonthChange = e =>
		this.setState({ month: e.target.value });

	onYearChange = e =>
		this.setState({ year: e.target.value });

	onCountryChange = e =>
		this.setState({ residence: e.target.value });

	onStateChange = e =>
		this.setState({ addressState: e.target.value });

	onCityChange = e =>
		this.setState({ addressCity: e.target.value });

	onPostcodeChange = e =>
		this.setState({ addressPostcode: e.target.value });

	onAddressLine1Change = e =>
		this.setState({ addressLine1: e.target.value });

	onAddressLine2Change = e =>
		this.setState({ addressLine2: e.target.value });

	onPhoneChange = e =>
		this.setState({ phone: e.target.value });

	onSecretQuestionChange = e =>
		this.setState({ secretQuestion: e.target.value });

	onSecretAnswerChange = e =>
		this.setState({ secretAnswer: e.target.value });

	onTermsAndConditionsChanged = e =>
		this.setState({ termsAndConditions: e.target.value });

    onFormSubmit = e => {
        e.preventDefault();
        this.setState({
            validatedOnce: true,
        });
        if (this.allValid) {
            this.performUpgrade();
        }
    }

    performUpgrade = async () => {
        const { salutation, firstName, lastName, residence,
			addressLine1, addressLine2, addressCity, addressState,
			addressPostcode, secretQuestion, secretAnswer, phone } = this.state;

        try {
            this.setState({
                progress: true,
                serverError: false,
            });
            const response = await api.createRealAccount({
                salutation,
				first_name: firstName,
				last_name: lastName,
				date_of_birth: '1980-01-31',
				residence,
				address_line_1: addressLine1,
				address_line_2: addressLine2,
				address_city: addressCity,
				address_state: addressState,
				address_postcode: addressPostcode,
				phone,
				secret_question: secretQuestion,
				secret_answer: secretAnswer,
            });
			localStorage.setItem('account', JSON.stringify({ token: response.new_account_real.oauth_token }));
            window.location = '/';
        } catch (error) {
            this.setState({ serverError: error.message });
        } finally {
            this.setState({
                progress: false,
            });
        }
    }

	render() {
		const { firstName, lastName, residence, addressLine1, addressCity, secretQuestion, secretAnswer,
			phone, termsAndConditions, progress, serverError, validatedOnce } = this.state;

		const firstNameIsValid = firstName.length >= 2;
		const lastNameIsValid = lastName.length >= 2;
		const residenceIsValid = residence.length > 0;
		const addressCityIsValid = addressCity.length > 0;
		const addressLine1IsValid = addressLine1.length > 0;
		const phoneIsValid = phone.length >= 6;
		const secretQuestionIsValid = secretQuestion.length > 0;
		const secretAnswerIsValid = secretAnswer.length > 0;
		this.allValid = firstNameIsValid && lastNameIsValid && residenceIsValid && addressCityIsValid &&
			addressLine1IsValid && phoneIsValid && secretQuestionIsValid && secretAnswerIsValid && termsAndConditions;

		return (
			<div className="upgrade-card" >
				<div className="full-logo">
					<LogoSpinner spinning={progress} />
					<img className="logo-text" src="img/binary-type-logo.svg" alt="Logo" />
				</div>
				{serverError &&
					<ErrorMsg text={serverError} />
				}
				<form onSubmit={this.onFormSubmit}>
					<Legend text="Personal Information" />
					<div className="input-row names-row">
						<select onChange={this.onSalutationChange}>
							<Option value="Mr" text="Mr" />
							<Option value="Mrs" text="Mrs" />
							<Option value="Ms" text="Ms" />
							<Option value="Miss" text="Miss" />
						</select>
						<input
							placeholder="First Name"
							type="text"
							onChange={this.onFirstNameChange}
							maxLength="30"
						/>
						<input
							placeholder="Last Name"
							type="text"
							onChange={this.onLastNameChange}
							maxLength="30"
						/>
					</div>
					{validatedOnce && !(firstNameIsValid && lastNameIsValid) &&
						<ErrorMsg text="Enter your first and last name" />
					}
					<div className="input-row">
						{/* <Label htmlFor="dobdd" text="Date of birth" /> */}
						<DateOfBirth
							onDayChange={this.onDayChange}
							onMonthChange={this.onMonthChange}
							onYearChange={this.onYearChange}
						/>
					</div>
					<Legend text="Home Address" />
					<div className="input-row">
						<Countries onChange={this.onCountryChange} />
						<select onChange={this.onStateChange}>
							{[].map(x => (
								<option key={x.value} value={x.value}>{x.text}</option>
							))}
						</select>
					</div>
					{validatedOnce && !residenceIsValid &&
						<ErrorMsg text="Choose your country" />
					}
					<div className="input-row">
						<input
							name="AddressTown"
							placeholder="Town/City"
							type="text"
							maxLength="35"
							onChange={this.onCityChange}
						/>
						<input
							name="AddressPostcode"
							placeholder="Postal Code / ZIP"
							type="text"
							maxLength="20"
							onChange={this.onPostcodeChange}
						/>
					</div>
					{validatedOnce && !addressCityIsValid &&
						<ErrorMsg text="City must not be empty" />
					}
					<div className="input-row">
						<input
							name="Address1"
							placeholder="Address First Line"
							type="text"
							maxLength="70"
							onChange={this.onAddressLine1Change}
						/>
					</div>
					{validatedOnce && !addressLine1IsValid &&
						<ErrorMsg text="Address must not be empty" />
					}
					<div className="input-row">
						<input
							name="Address2"
							placeholder="Address Second Line"
							type="text"
							maxLength="70"
							onChange={this.onAddressLine2Change}
						/>
					</div>
					<div className="input-row">
						<input
							name="Tel"
							placeholder="Telephone"
							type="tel"
							maxLength="35"
							onChange={this.onPhoneChange}
						/>
					</div>
					{validatedOnce && !phoneIsValid &&
						<ErrorMsg text="Enter a valid phone number" />
					}
					<Legend text="Security" />
					<div className="input-row">
						<SecretQuestion onChange={this.onSecretQuestionChange} />
						<input
							name="secretanswer"
							placeholder="Answer to secret question"
							type="text"
							maxLength="50"
							onChange={this.onSecretAnswerChange}
						/>
					</div>
					{validatedOnce && !secretQuestionIsValid &&
						<ErrorMsg text="Select a secret question" />
					}
					{validatedOnce && !secretAnswerIsValid &&
						<ErrorMsg text="Secret answer must be at least 4 characters" />
					}
					<div className="input-row">
						<label>
							<input
								name="tnc"
								type="checkbox"
								onClick={this.onTermsAndConditionsChanged}
							/>
							<M m="I agree to the" />&nbsp;
							<a href="https://binary.com/terms-and-conditions" target="_blank">
								<M m="terms and conditions" />
							</a>
						</label>
					</div>
					{validatedOnce && !termsAndConditions &&
						<ErrorMsg text="You need to agree to our Terms and Conditions" />
					}
					<Button disabled={progress || validatedOnce && !this.allValid} text="Open Account" />
				</form>
			</div>
		);
	}
}
