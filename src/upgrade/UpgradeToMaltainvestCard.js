import React, { PureComponent } from 'react';
import { M, InputGroup, SelectGroup, LogoSpinner, Legend, Button,
  ErrorMsg, ServerErrorMsg, DateOfBirth, Countries } from 'binary-components';
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
    tax_residence: string,
  };

  constructor(props) {
    super(props);
    this.state = {
      progress: false,
      statesList: [],
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
  }

  onEntryChange = (e: SyntheticEvent) =>
    this.setState({ [e.target.id]: e.target.value });

  onDayChange = (e: SyntheticEvent) =>
    this.setState({ day: e.target.value });

  onMonthChange = (e: SyntheticEvent) =>
    this.setState({ month: e.target.value });

  onYearChange = (e: SyntheticEvent) =>
    this.setState({ year: e.target.value });

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
    const { salutation, first_name, last_name, place_of_birth, residence,
      address_line_1, address_line_2, address_city, address_state, day, month, year,
      address_postcode, secret_question, secret_answer, phone, forex_trading_experience, forex_trading_frequency, indices_trading_experience, indices_trading_frequency, commodities_trading_experience, commodities_trading_frequency, stocks_trading_experience, stocks_trading_frequency, other_derivatives_trading_experience, other_derivatives_trading_frequency, other_instruments_trading_experience, other_instruments_trading_frequency, employment_industry, occupation, education_level, income_source, net_income, estimated_worth, accept_risk, tax_residence, tax_identification_number, account_turnover, account_opening_reason } = this.state;

    try {
      const response = await api.createRealAccountMaltaInvest({
        salutation,
        first_name,
        last_name,
        date_of_birth: year + '-' + month + '-' + day,
        place_of_birth,
        residence,
        address_line_1,
        address_line_2,
        address_city,
        address_state,
        address_postcode,
        phone,
        forex_trading_experience,
        forex_trading_frequency,
        indices_trading_experience,
        indices_trading_frequency,
        commodities_trading_experience,
        commodities_trading_frequency,
        stocks_trading_experience,
        stocks_trading_frequency,
        other_derivatives_trading_experience,
        other_derivatives_trading_frequency,
        other_instruments_trading_experience,
        other_instruments_trading_frequency,
        employment_industry,
        occupation,
        education_level,
        income_source,
        net_income,
        estimated_worth,
        accept_risk,
        tax_residence,
        tax_identification_number,
        account_turnover,
        account_opening_reason,
        secret_question,
        secret_answer,
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
    const { progress, serverError, statesList, residence, taxResidenceList, tax_residence } = this.state;
    const { residenceList, settings } = this.props;
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
            { settings.salutation &&
              <SelectGroup id="salutation" options={options.salutationOptions} value={settings.salutation} readOnly="true" />
            }
            { !settings.salutation &&
              <SelectGroup id="salutation" options={options.salutationOptions} onChange={this.onEntryChange} />
            }
            <InputGroup
              id="first_name"
              placeholder="First Name"
              type="text"
              onChange={this.onEntryChange}
              maxLength="30"
              defaultValue={settings.first_name}
              disabled={settings.first_name}
            />
            <InputGroup
              id="last_name"
              placeholder="Last Name"
              type="text"
              onChange={this.onEntryChange}
              maxLength="30"
              defaultValue={settings.last_name}
              disabled={settings.last_name}
            />
          </div>
          <div className="input-row">
            <DateOfBirth
              onDayChange={this.onDayChange}
              onMonthChange={this.onMonthChange}
              onYearChange={this.onYearChange}
            />
          </div>
          <div className="input-row">
            <SelectGroup id="place_of_birth" label="Place Of Birth" options={residenceList} onChange={this.onEntryChange} defaultValue={settings.place_of_birth} />
          </div>
          <div className="input-row">
            <SelectGroup label="Account opening reason" id="account_opening_reason" options={options.accountOpeningReasonOptions} onChange={this.onEntryChange} />
          </div>
          <Legend text="Tax Information" />
          <div className="input-row">
            <MultiSelect className="multi-select" name="tax-residence" value={tax_residence} onChange={this.onTaxResidenceChange} options={taxResidenceList} joinValues multi simpleValue searchable={false} labelKey="text" defaultValue={settings.tax_residence} />
          </div>
          <InputGroup
            id="tax_identification_number"
            placeholder="Tax identification number"
            type="text"
            onChange={this.onEntryChange}
            defaultValue={settings.tax_identification_number}
          />

          <Legend text="Home Address" />
          <div className="input-row">
            { residence &&
              <M id="residence" m={residenceList.find(element => element.value === residence).text} />
            }
            { !residence &&
              <Countries id="residence" value={residence} onChange={this.onCountryChange} residenceList={residenceList} disable />
            }

            <select id="address_state" onChange={this.onEntryChange} defaultValue={settings.address_state}>
              {statesList.map(x => (
                <option key={x.value} value={x.value}>{x.text}</option>
              ))}
            </select>
          </div>
          <div className="input-row">
            <InputGroup
              id="address_city"
              placeholder="Town/City"
              type="text"
              maxLength="35"
              defaultValue={settings.address_city}
              onChange={this.onEntryChange}
            />
            <InputGroup
              id="address_postcode"
              placeholder="Postal Code / ZIP"
              type="text"
              maxLength="20"
              defaultValue={settings.address_postcode}
              onChange={this.onEntryChange}
            />
          </div>
          <div className="input-row">
            <InputGroup
              id="address_line_1"
              placeholder="Address First Line"
              type="text"
              maxLength="70"
              defaultValue={settings.address_line_1}
              onChange={this.onEntryChange}
            />
          </div>
          <div className="input-row">
            <InputGroup
              id="address_line_2"
              placeholder="Address Second Line"
              type="text"
              maxLength="70"
              defaultValue={settings.address_line_2}
              onChange={this.onEntryChange}
            />
          </div>
          <div className="input-row">
            <InputGroup
              id="phone"
              placeholder="Phone"
              type="tel"
              maxLength="35"
              defaultValue={settings.phone}
              onChange={this.onEntryChange}
            />
          </div>
          <Legend text="Financial Information" />
          <div className="input-row">
            <SelectGroup label="Forex trading experience" id="forex_trading_experience" options={options.experienceOptions} onChange={this.onEntryChange} />
          </div>
          <div className="input-row">
            <SelectGroup label="Forex trading frequency" id="forex_trading_frequency" options={options.frequencyOptions} onChange={this.onEntryChange} />
          </div>
          <div className="input-row">
            <SelectGroup label="Indices trading experience" id="indices_trading_experience" options={options.experienceOptions} onChange={this.onEntryChange} />
          </div>
          <div className="input-row">
            <SelectGroup label="Indices trading frequency" id="indices_trading_frequency" options={options.frequencyOptions} onChange={this.onEntryChange} />
          </div>
          <div className="input-row">
            <SelectGroup label="Commodities trading experience" id="commodities_trading_experience" options={options.experienceOptions} onChange={this.onEntryChange} />
          </div>
          <div className="input-row">
            <SelectGroup label="Commodities trading frequency" id="commodities_trading_frequency" options={options.frequencyOptions} onChange={this.onEntryChange} />
          </div>
          <div className="input-row">
            <SelectGroup label="Stocks trading experience" id="stocks_trading_experience" options={options.experienceOptions} onChange={this.onEntryChange} />
          </div>
          <div className="input-row">
            <SelectGroup label="Stocks trading frequency" id="stocks_trading_frequency" options={options.frequencyOptions} onChange={this.onEntryChange} />
          </div>
          <div className="input-row">
            <SelectGroup label="Binary options or other financial derivatives trading experience" id="other_derivatives_trading_experience" options={options.experienceOptions} onChange={this.onEntryChange} />
          </div>
          <div className="input-row">
            <SelectGroup label="Binary options or other financial derivatives trading frequency" id="other_derivatives_trading_frequency" options={options.frequencyOptions} onChange={this.onEntryChange} />
          </div>
          <div className="input-row">
            <SelectGroup label="Other financial instruments trading experience" id="other_instruments_trading_experience" options={options.experienceOptions} onChange={this.onEntryChange} />
          </div>
          <div className="input-row">
            <SelectGroup label="Other financial instruments trading frequency" id="other_instruments_trading_frequency" options={options.frequencyOptions} onChange={this.onEntryChange} />
          </div>
          <div className="input-row">
            <SelectGroup label="Income Source" id="income_source" options={options.incomeSourceOptions} onChange={this.onEntryChange} />
          </div>
          <div className="input-row">
            <SelectGroup label="Employment Status" id="employmentStatus" options={options.employmentStatusOptions} onChange={this.onEntryChange} />
          </div>
          <div className="input-row">
            <SelectGroup label="Industry of Employment" id="employment_industry" options={options.employmentIndustryOptions} onChange={this.onEntryChange} />
          </div>
          <div className="input-row">
            <SelectGroup label="Occupation" id="occupation" options={options.occupationOptions} onChange={this.onEntryChange} />
          </div>
          <div className="input-row">
            <SelectGroup label="Source of Wealth" id="sourceOfWealth" options={options.sourceOfWealthOptions} onChange={this.onEntryChange} />
          </div>
          <div className="input-row">
            <SelectGroup label="Level of Education" id="education_level" options={options.educationLevelOptions} onChange={this.onEntryChange} />
          </div>
          <div className="input-row">
            <SelectGroup label="Net Annual Income" id="net_income" options={options.netIncomeOptions} onChange={this.onEntryChange} />
          </div>
          <div className="input-row">
            <SelectGroup label="Estimated Net Worth" id="estimated_worth" options={options.estimatedWorthOptions} onChange={this.onEntryChange} />
          </div>
          <div className="input-row">
            <SelectGroup label="Anticipated Account Turnover" id="account_turnover" options={options.accountTurnoverOptions} onChange={this.onEntryChange} />
          </div>

          <Legend text="Security" />
          <div className="input-row">
            <SecretQuestion onChange={this.onEntryChange} />
            <InputGroup
              id="secret_answer"
              placeholder="Answer To Secret Question"
              type="text"
              maxLength="50"
              onChange={this.onEntryChange}
            />
          </div>
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
