import React, { PureComponent } from 'react';
import moment from 'moment';
import head from 'lodash.head';
import validate from 'validate.js';
import { M, InputGroup, SelectGroup, LogoSpinner, Legend, Button,
  ErrorMsg, ServerErrorMsg, Countries, MultiSelectGroup } from 'binary-components';
import { api } from '../_data/LiveData';
import storage from '../_store/storage';
import options from './UpgradeCard.options';
import { getConstraints } from './UpgradeToMaltainvestCard.validation.config';

export default class UpgradeToMaltainvestCard extends PureComponent {

  static contextTypes = {
    router: () => undefined,
  }

  props: {
    residenceList: any[],
    country_code: string,
    loginid: string,
    states: any[],
    boot: any[],
    tax_residence: string,
    tax_identification_number: string,
    salutation: string,
    first_name: string,
    last_name: string,
    date_of_birth: string,
    place_of_birth: string,
    address_line_1: string,
    address_line_2: string,
    address_city: string,
    address_state: string,
    address_postcode: string,
    secret_question: string,
    secret_answer: string,
    phone: string,
  };

  constructor(props) {
    super(props);

    this.state = {
      progress: false,
      hasError: false,
      serverError: false,
      statesList: props.states,
      residence: props.country_code,
      tax_residence: props.tax_residence || '',
      tax_identification_number: props.tax_identification_number || '',
      salutation: props.salutation || '',
      first_name: props.first_name || '',
      last_name: props.last_name || '',
      date_of_birth: props.date_of_birth,
      place_of_birth: props.place_of_birth || '',
      address_line_1: props.address_line_1 || '',
      address_line_2: props.address_line_2 || '',
      address_city: props.address_city || '',
      address_state: props.address_state || '',
      address_postcode: props.address_postcode || '',
      secret_question: props.secret_question || '',
      secret_answer: props.secret_answer || '',
      phone: props.phone || '',
      accept_risk: '',
      PEPDeclaration: '',
      touched: {
        salutation: false,
        first_name: false,
        last_name: false,
        place_of_birth: false,
        date_of_birth: false,
        residence: false,
        address_line_1: false,
        address_line_2: false,
        address_city: false,
        address_state: false,
        address_postcode: false,
        secret_question: false,
        secret_answer: false,
        phone: false,
        forex_trading_experience: false,
        forex_trading_frequency: false,
        indices_trading_experience: false,
        indices_trading_frequency: false,
        commodities_trading_experience: false,
        commodities_trading_frequency: false,
        stocks_trading_experience: false,
        stocks_trading_frequency: false,
        other_derivatives_trading_experience: false,
        other_derivatives_trading_frequency: false,
        other_instruments_trading_experience: false,
        other_instruments_trading_frequency: false,
        employment_industry: false,
        occupation: false,
        education_level: false,
        income_source: false,
        net_income: false,
        estimated_worth: false,
        accept_risk: false,
        tax_residence: false,
        source_of_wealth: false,
        tax_identification_number: false,
        account_turnover: false,
        account_opening_reason: false,
      },
    };
  }

  componentWillMount() {
    this.setState({ date_of_birth: moment.unix(this.props.date_of_birth).format('YYYY-MM-DD') || '1980-01-01' });
    this.validateForm();
  }

  validateForm = () => {
    this.constraints = getConstraints(this.props);
    this.setState({
      errors: validate(this.state, this.constraints, { format: 'grouped', fullMessages: false, cleanAttributes: false }) || {},
    });
  }

  onEntryChange = (e: SyntheticEvent) => {
    this.setState({
      [e.target.id]: e.target.value,
      touched: { ...this.state.touched, [e.target.id]: true },
      hasError: false,
    }, () => {
      this.validateForm();
    });
  }

  onCountryChange = (e: SyntheticEvent) => {
    this.setState({ [e.target.id]: e.target.value, hasError: false, });
    api.getStatesForCountry(e.target.value).then(response =>
      this.setState({ statesList: response.states_list })
    );
    this.validateForm();
  }

  onTaxResidenceChange = (val) => this.setState({ tax_residence: val,
    /*eslint-disable */
    touched: { ...this.state.touched, 'tax_residence': true },
    /*eslint-enable */
    hasError: false,
  }, () => {
    this.validateForm();
  });

  onTermsAndConditionsChanged = (e: SyntheticEvent) => {
    const accept_risk = e.target.checked ? '1' : '0';
    this.setState({ accept_risk, touched: { ...this.state.touched, [e.target.id]: true }, });
  }

  onPEPDeclarationChanged = (e: SyntheticEvent) => {
    const PEPDeclaration = e.target.checked ? '1' : '0';
    this.setState({ PEPDeclaration, touched: { ...this.state.touched, [e.target.id]: true }, });
  }

  onFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (Object.keys(this.state.errors).length > 0) {
      this.setState({ hasError: true });
    } else {
      this.performUpgrade();
    }
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
      this.setState({
        progress: true,
        serverError: false,
      });
      const response = await api.createRealAccountMaltaInvest(createAccountParams);
      storage.setItem('account', JSON.stringify({ token: response.new_account_maltainvest.oauth_token }));
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
    const { progress, serverError, residence, statesList, tax_residence, salutation, first_name, last_name, place_of_birth, date_of_birth, address_line_1, address_line_2, address_city, address_state,
      address_postcode, secret_question, secret_answer, phone, forex_trading_experience, forex_trading_frequency, indices_trading_experience, indices_trading_frequency, commodities_trading_experience, commodities_trading_frequency, stocks_trading_experience, stocks_trading_frequency, other_derivatives_trading_experience, other_derivatives_trading_frequency, other_instruments_trading_experience, other_instruments_trading_frequency, employment_industry, occupation, education_level, income_source, net_income, estimated_worth, source_of_wealth, tax_identification_number, account_turnover, account_opening_reason, employment_status, hasError, errors, touched, accept_risk, PEPDeclaration } = this.state;
    const { residenceList, loginid, boot } = this.props;
    const language = boot.language ? boot.language : 'en';
    const linkToTermsAndConditions = `https://www.binary.com/${language}/terms-and-conditions.html`;
    const taxResidenceList = residenceList.slice();
    taxResidenceList.filter(props => {
      delete props.disabled;
      return true;
    });

    return (
      <div className="upgrade-card" >
        <div className="full-logo">
          <LogoSpinner spinning={progress} />
          <img className="logo-text" src="https://style.binary.com/images/logo/logotype_light.svg" alt="Logo" />
        </div>
        {serverError && <ServerErrorMsg text={serverError} />}
        {hasError && <ErrorMsg text="Please fill the form with valid values" />}
        <form onSubmit={this.onFormSubmit}>
          <Legend text="Personal Information" />
          <div className="input-row">
              <SelectGroup id="salutation" options={options.salutationOptions} value={salutation} readOnly={salutation} />
          </div>
          { touched.salutation && <ErrorMsg text={head((errors || {}).salutation)} /> }

          <div className="input-row">
            <InputGroup
              id="first_name"
              placeholder="First Name"
              type="text"
              onChange={this.onEntryChange}
              minLength="2"
              maxLength="30"
              value={first_name}
              readOnly={first_name}
            />
          </div>
          { touched.first_name && <ErrorMsg text={head((errors || {}).first_name)} /> }

          <div className="input-row">
            <InputGroup
              id="last_name"
              placeholder="Last Name"
              type="text"
              onChange={this.onEntryChange}
              minLength="2"
              maxLength="30"
              value={last_name}
              readOnly={last_name}
            />
          </div>
          { touched.last_name && <ErrorMsg text={head((errors || {}).last_name)} /> }

          <div className="input-row date-of-birth">
            <InputGroup
              id="date_of_birth"
              disabled={date_of_birth}
              label="Date of Birth"
              type="date"
              maxLength="10"
              value={date_of_birth || 'yyyy-mm-dd'}
              onChange={this.onEntryChange}
            />
          </div>
          { touched.date_of_birth && <ErrorMsg text={head((errors || {}).date_of_birth)} /> }

          <div className="input-row">
            <select id="place_of_birth" onChange={this.onEntryChange} value={place_of_birth}>
              <option value="" disabled>Place of Birth</option>
              {residenceList && residenceList.map((x: Residence) =>
                <option
                  key={x.value}
                  value={x.value}
                >
                  {x.text}
                </option>
              )}
            </select>
          </div>
          { touched.place_of_birth && <ErrorMsg text={head((errors || {}).place_of_birth)} /> }

          <div className="input-row">
            <SelectGroup
              label="Account opening reason"
              value={account_opening_reason}
              id="account_opening_reason"
              options={options.accountOpeningReasonOptions}
              onChange={this.onEntryChange}
            />
          </div>
          { touched.account_opening_reason && <ErrorMsg text={head((errors || {}).account_opening_reason)} /> }

          <Legend text="Tax Information" />
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
              placeholder="Tax identification number"
              maxLength="20"
              type="text"
              onChange={this.onEntryChange}
            />
          </div>
          { touched.tax_identification_number && <ErrorMsg text={head((errors || {}).tax_identification_number)} /> }

          <Legend text="Home Address" />
          <div className="input-row">
            { residence &&
              <M id="residence" m={residenceList.find(element => element.value === residence).text} value={residence} />
            }
            { !residence &&
              <Countries id="residence" value={residence} onChange={this.onCountryChange} residenceList={residenceList} />
            }
            { touched.residence && <ErrorMsg text={head((errors || {}).residence)} /> }
            <select id="address_state" onChange={this.onEntryChange} value={address_state}>
              {statesList.map(x => (
                <option key={x.value} value={x.value}>{x.text}</option>
              ))}
            </select>
          </div>
          { touched.address_state && <ErrorMsg text={head((errors || {}).address_state)} /> }

          <div className="input-row">
            <InputGroup
              id="address_city"
              value={address_city}
              placeholder="Town/City"
              type="text"
              maxLength="35"
              onChange={this.onEntryChange}
            />
          </div>
          { touched.address_city && <ErrorMsg text={head((errors || {}).address_city)} /> }

          <div className="input-row">
            <InputGroup
              id="address_postcode"
              value={address_postcode}
              placeholder="Postal Code / ZIP"
              type="text"
              maxLength="20"
              onChange={this.onEntryChange}
            />
          </div>
          { touched.address_postcode && <ErrorMsg text={head((errors || {}).address_postcode)} /> }

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
          { touched.address_line_1 && <ErrorMsg text={head((errors || {}).address_line_1)} /> }

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
          { touched.address_line_2 && <ErrorMsg text={head((errors || {}).address_line_2)} /> }

          <div className="input-row">
            <InputGroup
              id="phone"
              value={phone}
              placeholder="Phone"
              type="tel"
              minLength="6"
              maxLength="35"
              onChange={this.onEntryChange}
            />
          </div>
          { touched.phone && <ErrorMsg text={head((errors || {}).phone)} /> }

          <Legend text="Financial Information" />
          <div className="input-row">
            <SelectGroup
              label="Forex trading experience"
              value={forex_trading_experience}
              id="forex_trading_experience"
              options={options.experienceOptions}
              onChange={this.onEntryChange}
            />
          </div>
          { touched.forex_trading_experience && <ErrorMsg text={head((errors || {}).forex_trading_experience)} /> }

          <div className="input-row">
            <SelectGroup
              label="Forex trading frequency"
              value={forex_trading_frequency}
              id="forex_trading_frequency"
              options={options.frequencyOptions}
              onChange={this.onEntryChange}
            />
          </div>
          { touched.forex_trading_frequency && <ErrorMsg text={head((errors || {}).forex_trading_frequency)} /> }

          <div className="input-row">
            <SelectGroup
              label="Indices trading experience"
              value={indices_trading_experience}
              id="indices_trading_experience"
              options={options.experienceOptions}
              onChange={this.onEntryChange}
            />
          </div>
          { touched.indices_trading_experience && <ErrorMsg text={head((errors || {}).indices_trading_experience)} /> }

          <div className="input-row">
            <SelectGroup
              label="Indices trading frequency"
              value={indices_trading_frequency}
              id="indices_trading_frequency"
              options={options.frequencyOptions}
              onChange={this.onEntryChange}
            />
          </div>
          { touched.indices_trading_frequency && <ErrorMsg text={head((errors || {}).indices_trading_frequency)} /> }

          <div className="input-row">
            <SelectGroup
              label="Commodities trading experience"
              value={commodities_trading_experience}
              id="commodities_trading_experience"
              options={options.experienceOptions}
              onChange={this.onEntryChange}
            />
          </div>
          { touched.commodities_trading_experience && <ErrorMsg text={head((errors || {}).commodities_trading_experience)} /> }

          <div className="input-row">
            <SelectGroup
              label="Commodities trading frequency"
              value={commodities_trading_frequency}
              id="commodities_trading_frequency"
              options={options.frequencyOptions}
              onChange={this.onEntryChange}
            />
          </div>
          { touched.commodities_trading_frequency && <ErrorMsg text={head((errors || {}).commodities_trading_frequency)} /> }

          <div className="input-row">
            <SelectGroup
              label="Stocks trading experience"
              value={stocks_trading_experience}
              id="stocks_trading_experience"
              options={options.experienceOptions}
              onChange={this.onEntryChange}
            />
          </div>
          { touched.stocks_trading_experience && <ErrorMsg text={head((errors || {}).stocks_trading_experience)} /> }

          <div className="input-row">
            <SelectGroup
              label="Stocks trading frequency"
              value={stocks_trading_frequency}
              id="stocks_trading_frequency"
              options={options.frequencyOptions}
              onChange={this.onEntryChange}
            />
          </div>
          { touched.stocks_trading_frequency && <ErrorMsg text={head((errors || {}).stocks_trading_frequency)} /> }

          <div className="input-row">
            <SelectGroup
              label="Binary options or other financial derivatives trading experience"
              value={other_derivatives_trading_experience}
              id="other_derivatives_trading_experience"
              options={options.experienceOptions}
              onChange={this.onEntryChange}
            />
          </div>
          { touched.other_derivatives_trading_experience && <ErrorMsg text={head((errors || {}).other_derivatives_trading_experience)} /> }

          <div className="input-row">
            <SelectGroup
              label="Binary options or other financial derivatives trading frequency"
              value={other_derivatives_trading_frequency}
              id="other_derivatives_trading_frequency"
              options={options.frequencyOptions}
              onChange={this.onEntryChange}
            />
          </div>
          { touched.other_derivatives_trading_frequency && <ErrorMsg text={head((errors || {}).other_derivatives_trading_frequency)} /> }

          <div className="input-row">
            <SelectGroup
              label="Other financial instruments trading experience"
              value={other_instruments_trading_experience}
              id="other_instruments_trading_experience"
              options={options.experienceOptions}
              onChange={this.onEntryChange}
            />
          </div>
          { touched.other_instruments_trading_experience && <ErrorMsg text={head((errors || {}).other_instruments_trading_experience)} /> }

          <div className="input-row">
            <SelectGroup
              label="Other financial instruments trading frequency"
              value={other_instruments_trading_frequency}
              id="other_instruments_trading_frequency"
              options={options.frequencyOptions}
              onChange={this.onEntryChange}
            />
          </div>
          { touched.other_instruments_trading_frequency && <ErrorMsg text={head((errors || {}).other_instruments_trading_frequency)} /> }

          <div className="input-row">
            <SelectGroup
              label="Income Source"
              value={income_source}
              id="income_source"
              options={options.incomeSourceOptions}
              onChange={this.onEntryChange}
            />
          </div>
          { touched.income_source && <ErrorMsg text={head((errors || {}).income_source)} /> }

          <div className="input-row">
            <SelectGroup
              label="Employment Status"
              value={employment_status}
              id="employment_status"
              options={options.employmentStatusOptions}
              onChange={this.onEntryChange}
            />
          </div>
          { touched.employment_status && <ErrorMsg text={head((errors || {}).employment_status)} /> }

          <div className="input-row">
            <SelectGroup
              label="Industry of Employment"
              value={employment_industry}
              id="employment_industry"
              options={options.employmentIndustryOptions}
              onChange={this.onEntryChange}
            />
          </div>
          { touched.employment_industry && <ErrorMsg text={head((errors || {}).employment_industry)} /> }

          <div className="input-row">
            <SelectGroup
              label="Occupation"
              value={occupation}
              id="occupation"
              options={options.occupationOptions}
              onChange={this.onEntryChange}
            />
          </div>
          { touched.occupation && <ErrorMsg text={head((errors || {}).occupation)} /> }

          <div className="input-row">
            <SelectGroup
              label="Source of Wealth"
              value={source_of_wealth}
              id="source_of_wealth"
              options={options.sourceOfWealthOptions}
              onChange={this.onEntryChange}
            />
          </div>
          { touched.source_of_wealth && <ErrorMsg text={head((errors || {}).source_of_wealth)} /> }

          <div className="input-row">
            <SelectGroup
              label="Level of Education"
              value={education_level}
              id="education_level"
              options={options.educationLevelOptions}
              onChange={this.onEntryChange}
            />
          </div>
          { touched.education_level && <ErrorMsg text={head((errors || {}).education_level)} /> }

          <div className="input-row">
            <SelectGroup
              label="Net Annual Income"
              value={net_income}
              id="net_income"
              options={options.netIncomeOptions}
              onChange={this.onEntryChange}
            />
          </div>
          { touched.net_income && <ErrorMsg text={head((errors || {}).net_income)} /> }

          <div className="input-row">
            <SelectGroup
              label="Estimated Net Worth"
              value={estimated_worth}
              id="estimated_worth"
              options={options.estimatedWorthOptions}
              onChange={this.onEntryChange}
            />
          </div>
          { touched.estimated_worth && <ErrorMsg text={head((errors || {}).estimated_worth)} /> }

          <div className="input-row">
            <SelectGroup
              label="Anticipated Account Turnover"
              value={account_turnover}
              id="account_turnover"
              options={options.accountTurnoverOptions}
              onChange={this.onEntryChange}
            />
          </div>
          { touched.account_turnover && <ErrorMsg text={head((errors || {}).account_turnover)} /> }

          { loginid.startsWith('VRTC') &&
            <div>
              <Legend text="Security" />
              <div className="input-row">
                <SelectGroup
                  id="secret_question"
                  value={secret_question}
                  options={options.secretQuestionOptions}
                  onChange={this.onEntryChange}
                />
              </div>
                { touched.secret_question && <ErrorMsg text={head((errors || {}).salutation)} /> }

              <div className="input-row">
                <InputGroup
                  id="secret_answer"
                  value={secret_answer}
                  placeholder="Answer To Secret Question"
                  type="text"
                  minLength="4"
                  maxLength="50"
                  onChange={this.onEntryChange}
                />
              </div>
              { touched.secret_answer && <ErrorMsg text={head((errors || {}).secret_answer)} /> }

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
          { touched.PEPDeclaration && PEPDeclaration !== '1' && <ErrorMsg text="Please confirm that you are not a politically exposed person." /> }

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
          { touched.accept_risk && accept_risk !== '1' && <ErrorMsg text="Please accept the terms and conditions." /> }

          <Button disabled={progress} text="Open Account" />
        </form>
      </div>
    );
  }
}
