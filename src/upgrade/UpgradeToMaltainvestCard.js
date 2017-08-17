import React, { PureComponent } from 'react';
import { M, InputGroup, LogoSpinner, Legend, Button, Option,
  ErrorMsg, ServerErrorMsg, DateOfBirth, Countries } from 'binary-components';
import { api } from '../_data/LiveData';
import storage from '../_store/storage';
import SecretQuestion from './SecretQuestion';

export default class UpgradeToMaltainvestCard extends PureComponent {

  static contextTypes = {
    router: () => undefined,
  }

  props: {
    residenceList: any[],
  };

  constructor(props) {
    super(props);
    this.state = {
      progress: false,
      validatedOnce: '',
      salutation: 'Mr',
      firstName: '',
      lastName: '',
      residence: '',
      addressCity: '',
      addressLine1: '',
      phone: '',
      forex_trading_experience: '',
      forex_trading_frequency: '',
      indices_trading_experience: '',
      indices_trading_frequency: '',
      commodities_trading_experience: '',
      commodities_trading_frequency: '',
      stocks_trading_experience: '',
      stocks_trading_frequency: '',
      other_derivatives_trading_experience: '',
      other_derivatives_trading_frequency: '',
      other_instruments_trading_experience: '',
      other_instruments_trading_frequency: '',
      employment_industry: '',
      occupation: '',
      education_level: '',
      income_source: '',
      net_income: '',
      estimated_worth: '',
      accept_risk: '',
      tax_residence: '',
      tax_identification_number: '',
      account_turnover: '',
      account_opening_reason: '',
      secretQuestion: '',
      secretAnswer: '',
      statesList: [],
    };
  }

  onEntryChange = (e: SyntheticEvent) =>
    this.setState({ [e.target.id]: e.target.value });

  onFirstNameValid = firstName =>
    /^[a-zA-Z\s'.-]{2,30}$/.test(firstName);

  onLastNameValid = lastName =>
    /^[a-zA-Z\s'.-]{2,30}$/.test(lastName);

  onDayChange = (e: SyntheticEvent) =>
    this.setState({ day: e.target.value });

  onMonthChange = (e: SyntheticEvent) =>
    this.setState({ month: e.target.value });

  onYearChange = (e: SyntheticEvent) =>
    this.setState({ year: e.target.value });

  onCountryChange = (e: SyntheticEvent) => {
    this.setState({ residence: e.target.value });
    api.getStatesForCountry(e.target.value).then(response =>
      this.setState({ statesList: response.states_list })
    );
  }

  onStateChange = (e: SyntheticEvent) => {
    this.setState({ addressState: e.target.value });
  }

  onCityChange = (e: SyntheticEvent) =>
    this.setState({ addressCity: e.target.value });

  onPostcodeChange = (e: SyntheticEvent) =>
    this.setState({ addressPostcode: e.target.value });

  onAddressLine1Change = (e: SyntheticEvent) =>
    this.setState({ addressLine1: e.target.value });

  onAddressLine2Change = (e: SyntheticEvent) =>
    this.setState({ addressLine2: e.target.value });

  onPhoneChange = (e: SyntheticEvent) =>
    this.setState({ phone: e.target.value });

  onSecretQuestionChange = (e: SyntheticEvent) =>
    this.setState({ secretQuestion: e.target.value });

  onSecretAnswerChange = (e: SyntheticEvent) =>
    this.setState({ secretAnswer: e.target.value });

  onTermsAndConditionsChanged = (e: SyntheticEvent) =>
    this.setState({ termsAndConditions: e.target.value });

  onFormSubmit = (e: SyntheticEvent) => {
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
      addressPostcode, secretQuestion, secretAnswer, phone, forexTradingExperience, forexTradingFrequency, indicesTradingExperience, indicesTradingFrequency, commoditiesTradingExperience, commoditiesTradingFrequency, stocksTradingExperience, stocksTradingFrequency, otherDerivativesTradingExperience, otherDerivativesTradingFrequency, otherInstrumentsTradingExperience, otherInstrumentsTradingFrequency, employmentIndustry, occupation, educationLevel, incomeSource, netIncome, estimatedWorth, acceptRisk, taxResidence, taxIdentificationNumber, accountTurnover, accountOpeningReason } = this.state;

    try {
      this.setState({
        progress: true,
        serverError: false,
      });
      const response = await api.createRealAccountMaltaInvest({
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
        forex_trading_experience: forexTradingExperience,
        forex_trading_frequency: forexTradingFrequency,
        indices_trading_experience: indicesTradingExperience,
        indices_trading_frequency: indicesTradingFrequency,
        commodities_trading_experience: commoditiesTradingExperience,
        commodities_trading_frequency: commoditiesTradingFrequency,
        stocks_trading_experience: stocksTradingExperience,
        stocks_trading_frequency: stocksTradingFrequency,
        other_derivatives_trading_experience: otherDerivativesTradingExperience,
        other_derivatives_trading_frequency: otherDerivativesTradingFrequency,
        other_instruments_trading_experience: otherInstrumentsTradingExperience,
        other_instruments_trading_frequency: otherInstrumentsTradingFrequency,
        employment_industry: employmentIndustry,
        occupation,
        education_level: educationLevel,
        income_source: incomeSource,
        net_income: netIncome,
        estimated_worth: estimatedWorth,
        accept_risk: acceptRisk,
        tax_residence: taxResidence,
        tax_identification_number: taxIdentificationNumber,
        account_turnover: accountTurnover,
        account_opening_reason: accountOpeningReason,
        secret_question: secretQuestion,
        secret_answer: secretAnswer,
      });
      storage.setItem('account', JSON.stringify({ token: response.new_account_real.oauth_token }));
      window.location = '/';
    } catch (e) {
      this.setState({ serverError: e.error.error.message });
    } finally {
      this.setState({
        progress: false,
      });
    }
  }

  render() {
    const { firstName, lastName, residence, addressLine1, addressCity, secretQuestion, secretAnswer,
      phone, termsAndConditions, progress, serverError, validatedOnce, statesList } = this.state;
    const { residenceList } = this.props;

    const boot = storage.boot ? JSON.parse(storage.boot) : '';
    const language = boot.language ? boot.language.toLowerCase() : 'en';
    const linkToTermsAndConditions = `https://www.binary.com/${language}/terms-and-conditions.html`;

    const firstNameIsValid = firstName.length >= 2;
    const lastNameIsValid = lastName.length >= 2;
    const residenceIsValid = residence.length > 0;
    const addressCityIsValid = addressCity.length > 0;
    const addressLine1IsValid = addressLine1.length > 0;
    const phoneIsValid = phone.length >= 6;
    const secretQuestionIsValid = secretQuestion.length > 0;
    const secretAnswerIsValid = secretAnswer.length > 0;
    this.allValid = firstNameIsValid && lastNameIsValid && residenceIsValid &&
      addressCityIsValid && addressLine1IsValid && phoneIsValid &&
      secretQuestionIsValid && secretAnswerIsValid && termsAndConditions;

    return (
      <div className="upgrade-card" >
        <div className="full-logo">
          <LogoSpinner spinning={progress} />
          <img className="logo-text" src="https://style.binary.com/images/logo/logotype_light.svg" alt="Logo" />
        </div>
        {serverError && <ServerErrorMsg text={serverError} />}
        <form onSubmit={this.onFormSubmit}>
          <Legend text="Personal Information" />
          <div className="input-row names-row">
            <select id="salutation" onChange={this.onEntryChange}>
              <Option value="Mr" text="Mr" />
              <Option value="Mrs" text="Mrs" />
              <Option value="Ms" text="Ms" />
              <Option value="Miss" text="Miss" />
            </select>
            <InputGroup
              id="firstName"
              placeholder="First Name"
              type="text"
              onChange={this.onEntryChange}
              maxLength="30"
            />
            <InputGroup
              id="lastName"
              placeholder="Last Name"
              type="text"
              onChange={this.onEntryChange}
              maxLength="30"
            />
          </div>
          {validatedOnce && !(firstNameIsValid && lastNameIsValid) &&
          <ErrorMsg text="Enter your first and last name" />
          }
          <div className="input-row">
            <DateOfBirth
              onDayChange={this.onDayChange}
              onMonthChange={this.onMonthChange}
              onYearChange={this.onYearChange}
            />
          </div>
          <Legend text="Home Address" />
          <div className="input-row">
            <Countries onChange={this.onCountryChange} residenceList={residenceList} />
            <select onChange={this.onStateChange}>
              {statesList.map(x => (
                <option key={x.value} value={x.value}>{x.text}</option>
              ))}
            </select>
          </div>
          {validatedOnce && !residenceIsValid &&
          <ErrorMsg text="Choose your country" />
          }
          <div className="input-row">
            <InputGroup
              name="AddressTown"
              placeholder="Town/City"
              type="text"
              maxLength="35"
              onChange={this.onCityChange}
            />
            <InputGroup
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
            <InputGroup
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
            <InputGroup
              name="Address2"
              placeholder="Address Second Line"
              type="text"
              maxLength="70"
              onChange={this.onAddressLine2Change}
            />
          </div>
          <div className="input-row">
            <InputGroup
              name="Tel"
              placeholder="Phone"
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
            <InputGroup
              name="secretanswer"
              placeholder="Answer To Secret Question"
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
            <label htmlFor="tnc">
              <input
                id="tnc"
                name="tnc"
                type="checkbox"
                onClick={this.onTermsAndConditionsChanged}
              />
              <M m="I agree to the" />&nbsp;
              <a href={linkToTermsAndConditions} target="_blank" rel="noopener noreferrer">
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
