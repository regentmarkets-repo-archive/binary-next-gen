import React, { PureComponent } from 'react';
import moment from 'moment';
import { M, InputGroup, SelectGroup, LogoSpinner, Legend, Button,
  ErrorMsg, ServerErrorMsg, Countries } from 'binary-components';
import { api } from '../_data/LiveData';
import { store } from '../_store/persistentStore';
import storage from '../_store/storage';
import SecretQuestion from './SecretQuestion';
import { getOptions } from './UpgradeCard.options';
import MultiSelect from '../MultiSelect/MultiSelect';

export default class UpgradeToMaltainvestCard extends PureComponent {

  static contextTypes = {
    router: () => undefined,
  }

  props: {
    residenceList: any[],
    settings: any[],
    loginid: string,
  };

  constructor(props) {
    super(props);

    this.state = {
      progress: false,
      statesList: [],
      tax_residence: props.settings.tax_residence || '',
      tax_identification_number: props.settings.tax_identification_number || '',
      salutation: props.settings.salutation || '',
      first_name: props.settings.first_name || '',
      last_name: props.settings.last_name || '',
      place_of_birth: props.settings.place_of_birth || '',
      address_line_1: props.settings.address_line_1 || '',
      address_line_2: props.settings.address_line_2 || '',
      address_city: props.settings.address_city || '',
      address_state: props.settings.address_state || '',
      address_postcode: props.settings.address_postcode || '',
      secret_question: props.settings.secret_question || '',
      secret_answer: props.settings.secret_answer || '',
      phone: props.settings.phone || '',
    };
  }

  componentWillMount() {
    const residence = store.getState().account.get('country');
    if (residence) {
      api.getStatesForCountry(residence).then(response =>
        this.setState({ residence, statesList: response.states_list })
      );
    }
    const taxResidenceList = this.props.residenceList.slice(0);
    taxResidenceList.forEach((val) => {
      delete val.disabled;
    });
    this.setState({ taxResidenceList });
    this.setState({ date_of_birth: moment.unix(this.props.settings.date_of_birth).format('YYYY-MM-DD') || '1980-01-01' });
  }

  onEntryChange = (e: SyntheticEvent) =>
    this.setState({ [e.target.id]: e.target.value });

  onCountryChange = (e: SyntheticEvent) => {
    this.setState({ [e.target.id]: e.target.value });
    api.getStatesForCountry(e.target.value).then(response =>
      this.setState({ statesList: response.states_list })
    );
  }

  onTaxResidenceChange = (val) => {
    this.setState({ tax_residence: val });
  }

  onTermsAndConditionsChanged = (e: SyntheticEvent) => {
    const accept_risk = e.target.checked ? '1' : '0';
    this.setState({ accept_risk });
  }

  onFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    this.performUpgrade();
  }

  performUpgrade = async () => {
    const loginid = this.props.loginid;
    const { salutation, first_name, last_name, place_of_birth, date_of_birth, residence,
      address_line_1, address_line_2, address_city, address_state,
      address_postcode, secret_question, secret_answer, phone, forex_trading_experience, forex_trading_frequency, indices_trading_experience, indices_trading_frequency, commodities_trading_experience, commodities_trading_frequency, stocks_trading_experience, stocks_trading_frequency, other_derivatives_trading_experience, other_derivatives_trading_frequency, other_instruments_trading_experience, other_instruments_trading_frequency, employment_industry, occupation, education_level, income_source, net_income, estimated_worth, accept_risk, tax_residence, source_of_wealth, tax_identification_number, account_turnover, account_opening_reason } = this.state;
    const createAccountParams = {
      salutation, first_name, last_name, place_of_birth, date_of_birth, residence,
      address_line_1, address_line_2, address_city, address_state,
      address_postcode, phone, forex_trading_experience, forex_trading_frequency, indices_trading_experience, indices_trading_frequency, commodities_trading_experience, commodities_trading_frequency, stocks_trading_experience, stocks_trading_frequency, other_derivatives_trading_experience, other_derivatives_trading_frequency, other_instruments_trading_experience, other_instruments_trading_frequency, employment_industry, occupation, education_level, income_source, net_income, estimated_worth, accept_risk, tax_residence, source_of_wealth, tax_identification_number, account_turnover, account_opening_reason,
    };
    if (loginid.startsWith('VRTC')) {
      createAccountParams.secret_question = secret_question;
      createAccountParams.secret_answer = secret_answer;
    }

    try {
      const response = await api.createRealAccountMaltaInvest(createAccountParams);
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
    const { progress, serverError, statesList, residence, taxResidenceList, tax_residence, salutation, first_name, last_name, place_of_birth, date_of_birth, address_line_1, address_line_2, address_city, address_state,
      address_postcode, secret_question, secret_answer, phone, forex_trading_experience, forex_trading_frequency, indices_trading_experience, indices_trading_frequency, commodities_trading_experience, commodities_trading_frequency, stocks_trading_experience, stocks_trading_frequency, other_derivatives_trading_experience, other_derivatives_trading_frequency, other_instruments_trading_experience, other_instruments_trading_frequency, employment_industry, occupation, education_level, income_source, net_income, estimated_worth, source_of_wealth, tax_identification_number, account_turnover, account_opening_reason, employment_status } = this.state;
    const { residenceList, loginid } = this.props;
    const options = getOptions();
    const boot = storage.boot ? JSON.parse(storage.boot) : '';
    const language = boot.language ? boot.language.toLowerCase() : 'en';
    const linkToTermsAndConditions = `https://www.binary.com/${language}/terms-and-conditions.html`;

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
            { salutation &&
              <SelectGroup id="salutation" options={options.salutationOptions} value={salutation} readOnly="true" />
            }
            { !salutation &&
              <SelectGroup id="salutation" value={salutation} options={options.salutationOptions} onChange={this.onEntryChange} />
            }
            <InputGroup
              id="first_name"
              placeholder="First Name"
              type="text"
              onChange={this.onEntryChange}
              maxLength="30"
              value={first_name}
              disabled={first_name}
            />
            <InputGroup
              id="last_name"
              placeholder="Last Name"
              type="text"
              onChange={this.onEntryChange}
              maxLength="30"
              value={last_name}
              disabled={last_name}
            />
          </div>
          <div className="input-row">
            <InputGroup
              id="date_of_birth"
              disabled={date_of_birth}
              label="Date of Birth"
              type="date"
              maxLength="10"
              defaultValue={date_of_birth || 'yyyy-mm-dd'}
              onChange={this.onEntryChange}
            />
          </div>
          <div className="input-row">
            <select id="place_of_birth" onChange={this.onEntryChange} value={place_of_birth}>
              <option value="">Place of Birth</option>
              {residenceList.map((x: Residence) =>
                <option
                  key={x.value}
                  value={x.value}
                >
                  {x.text}
                </option>
              )}
            </select>
          </div>
          <div className="input-row">
            <SelectGroup value={account_opening_reason} label="Account opening reason" id="account_opening_reason" options={options.accountOpeningReasonOptions} onChange={this.onEntryChange} />
          </div>
          <Legend text="Tax Information" />
          <div className="input-row">
            <MultiSelect placeholder="Tax Residence" className="multi-select" value={tax_residence} onChange={this.onTaxResidenceChange} options={taxResidenceList} joinValues multi simpleValue searchable={false} labelKey="text" />
          </div>
          <InputGroup
            id="tax_identification_number"
            value={tax_identification_number}
            placeholder="Tax identification number"
            type="text"
            onChange={this.onEntryChange}
          />

          <Legend text="Home Address" />
          <div className="input-row">
            { residence &&
              <M id="residence" m={residenceList.find(element => element.value === residence).text} value={residence} />
            }
            { !residence &&
              <Countries id="residence" value={residence} onChange={this.onCountryChange} residenceList={residenceList} disable />
            }

            <select id="address_state" onChange={this.onEntryChange} value={address_state}>
              {statesList.map(x => (
                <option key={x.value} value={x.value}>{x.text}</option>
              ))}
            </select>
          </div>
          <div className="input-row">
            <InputGroup
              id="address_city"
              value={address_city}
              placeholder="Town/City"
              type="text"
              maxLength="35"
              onChange={this.onEntryChange}
            />
            <InputGroup
              id="address_postcode"
              value={address_postcode}
              placeholder="Postal Code / ZIP"
              type="text"
              maxLength="20"
              onChange={this.onEntryChange}
            />
          </div>
          <div className="input-row">
            <InputGroup
              id="address_line_1"
              value={address_line_1}
              placeholder="Address First Line"
              type="text"
              maxLength="70"
              onChange={this.onEntryChange}
            />
          </div>
          <div className="input-row">
            <InputGroup
              id="address_line_2"
              value={address_line_2}
              placeholder="Address Second Line"
              type="text"
              maxLength="70"
              onChange={this.onEntryChange}
            />
          </div>
          <div className="input-row">
            <InputGroup
              id="phone"
              value={phone}
              placeholder="Phone"
              type="tel"
              maxLength="35"
              onChange={this.onEntryChange}
            />
          </div>
          <Legend text="Financial Information" />
          <div className="input-row">
            <SelectGroup label="Forex trading experience" value={forex_trading_experience} id="forex_trading_experience" options={options.experienceOptions} onChange={this.onEntryChange} />
          </div>
          <div className="input-row">
            <SelectGroup label="Forex trading frequency" value={forex_trading_frequency} id="forex_trading_frequency" options={options.frequencyOptions} onChange={this.onEntryChange} />
          </div>
          <div className="input-row">
            <SelectGroup label="Indices trading experience" value={indices_trading_experience} id="indices_trading_experience" options={options.experienceOptions} onChange={this.onEntryChange} />
          </div>
          <div className="input-row">
            <SelectGroup label="Indices trading frequency" value={indices_trading_frequency} id="indices_trading_frequency" options={options.frequencyOptions} onChange={this.onEntryChange} />
          </div>
          <div className="input-row">
            <SelectGroup label="Commodities trading experience" value={commodities_trading_experience} id="commodities_trading_experience" options={options.experienceOptions} onChange={this.onEntryChange} />
          </div>
          <div className="input-row">
            <SelectGroup label="Commodities trading frequency" value={commodities_trading_frequency} id="commodities_trading_frequency" options={options.frequencyOptions} onChange={this.onEntryChange} />
          </div>
          <div className="input-row">
            <SelectGroup label="Stocks trading experience" value={stocks_trading_experience} id="stocks_trading_experience" options={options.experienceOptions} onChange={this.onEntryChange} />
          </div>
          <div className="input-row">
            <SelectGroup label="Stocks trading frequency" value={stocks_trading_frequency} id="stocks_trading_frequency" options={options.frequencyOptions} onChange={this.onEntryChange} />
          </div>
          <div className="input-row">
            <SelectGroup label="Binary options or other financial derivatives trading experience" value={other_derivatives_trading_experience} id="other_derivatives_trading_experience" options={options.experienceOptions} onChange={this.onEntryChange} />
          </div>
          <div className="input-row">
            <SelectGroup label="Binary options or other financial derivatives trading frequency" value={other_derivatives_trading_frequency} id="other_derivatives_trading_frequency" options={options.frequencyOptions} onChange={this.onEntryChange} />
          </div>
          <div className="input-row">
            <SelectGroup label="Other financial instruments trading experience" value={other_instruments_trading_experience} id="other_instruments_trading_experience" options={options.experienceOptions} onChange={this.onEntryChange} />
          </div>
          <div className="input-row">
            <SelectGroup label="Other financial instruments trading frequency" value={other_instruments_trading_frequency} id="other_instruments_trading_frequency" options={options.frequencyOptions} onChange={this.onEntryChange} />
          </div>
          <div className="input-row">
            <SelectGroup label="Income Source" value={income_source} id="income_source" options={options.incomeSourceOptions} onChange={this.onEntryChange} />
          </div>
          <div className="input-row">
            <SelectGroup label="Employment Status" value={employment_status} id="employment_status" options={options.employmentStatusOptions} onChange={this.onEntryChange} />
          </div>
          <div className="input-row">
            <SelectGroup label="Industry of Employment" value={employment_industry} id="employment_industry" options={options.employmentIndustryOptions} onChange={this.onEntryChange} />
          </div>
          <div className="input-row">
            <SelectGroup label="Occupation" value={occupation} id="occupation" options={options.occupationOptions} onChange={this.onEntryChange} />
          </div>
          <div className="input-row">
            <SelectGroup label="Source of Wealth" value={source_of_wealth} id="source_of_wealth" options={options.sourceOfWealthOptions} onChange={this.onEntryChange} />
          </div>
          <div className="input-row">
            <SelectGroup label="Level of Education" value={education_level} id="education_level" options={options.educationLevelOptions} onChange={this.onEntryChange} />
          </div>
          <div className="input-row">
            <SelectGroup label="Net Annual Income" value={net_income} id="net_income" options={options.netIncomeOptions} onChange={this.onEntryChange} />
          </div>
          <div className="input-row">
            <SelectGroup label="Estimated Net Worth" value={estimated_worth} id="estimated_worth" options={options.estimatedWorthOptions} onChange={this.onEntryChange} />
          </div>
          <div className="input-row">
            <SelectGroup label="Anticipated Account Turnover" value={account_turnover} id="account_turnover" options={options.accountTurnoverOptions} onChange={this.onEntryChange} />
          </div>

          { loginid.startsWith('VRTC') &&
            <div>
              <Legend text="Security" />
              <div className="input-row">
                <SecretQuestion value={secret_question} onChange={this.onEntryChange} />
                <InputGroup
                  id="secret_answer"
                  value={secret_answer}
                  placeholder="Answer To Secret Question"
                  type="text"
                  maxLength="50"
                  onChange={this.onEntryChange}
                />
              </div>
            </div>
          }
          <Legend text="PEP Declaration" />
            <M m="A PEP is an individual who is or has been entrusted with a prominent public function. This status extends to a PEP's relatives and close associates." />
          <div className="input-row">
            <label htmlFor="PEPDeclaration">
              <input
                id="PEPDeclaration"
                type="checkbox"
                onClick={this.onPEPDeclarationChanged}
              />
              <M m="I acknowledge that I am not a politically exposed person (PEP)." />&nbsp;
            </label>
          </div>
          <M m="The financial trading services contained within this site are only suitable for customers who are able to bear the loss of all the money they invest and who understand and have experience of the risk involved in the acquistion of financial contracts. Transactions in financial contracts carry a high degree of risk. If purchased contracts expire worthless, you will suffer a total loss of your investment, which consists of the contract premium." />
          <div className="input-row">
            <label htmlFor="accept_risk">
              <input
                id="accept_risk"
                type="checkbox"
                onChange={this.onTermsAndConditionsChanged}
              />
              <M m="I agree to the" />&nbsp;
              <a href={linkToTermsAndConditions} target="_blank" rel="noopener noreferrer">
                <M m="terms and conditions" />
              </a>
            </label>
          </div>
          <Button text="Open Account" />
        </form>
      </div>
    );
  }
}
