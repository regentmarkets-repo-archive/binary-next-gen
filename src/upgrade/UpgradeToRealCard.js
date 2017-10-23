import React, { PureComponent } from 'react';
import head from 'lodash.head';
import validate from 'validate.js/validate.min';
import { M, InputGroup, SelectGroup, LogoSpinner, Legend, Button,
	ErrorMsg, ServerErrorMsg, Countries } from 'binary-components';
import { api } from '../_data/LiveData';
import storage from '../_store/storage';
import { getConstraints } from './UpgradeToRealCard.validation.config';
import options from './UpgradeCard.options';

export default class UpgradeToRealCard extends PureComponent {

	static contextTypes = {
		router: () => undefined,
	}

	props: {
		residenceList: any[],
		boot: any[],
    country_code: string,
		states: any[],
  };

	constructor(props) {
		super(props);
		this.state = {
			hasError: false,
			progress: false,
			serverError: false,
			statesList: props.states,
			salutation: '',
			first_name: '',
			last_name: '',
      date_of_birth: '',
      place_of_birth: '',
			address_city: '',
			address_state: '',
			address_line_1: '',
			address_line_2: '',
      address_postcode: '',
			phone: '',
			secret_question: '',
			secret_answer: '',
      residence: props.country_code,
			accept_risk: '',
			PEPDeclaration: '',
      account_opening_reason: '',
			touched: {
				salutation: false,
				first_name: false,
        last_name: false,
        residence: false,
        date_of_birth: false,
				place_of_birth: false,
        address_city: false,
				address_state: false,
        address_line_1: false,
        address_line_2: false,
        phone: false,
        secret_question: false,
        secret_answer: false,
				accept_risk: false,
			}
		};
	}

	componentWillMount() {
    this.validateForm();
	}

  validateForm = () => {
    this.constraints = getConstraints();
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
    if (Object.keys(this.state.errors).length > 0 || this.state.PEPDeclaration !== '1' || this.state.accept_risk !== '1') {
      this.setState({ hasError: true });
    } else {
      this.performUpgrade();
    }
  }

    performUpgrade = async () => {
        const { salutation, first_name, last_name, date_of_birth, place_of_birth, residence,
			address_line_1, address_line_2, address_city, address_state,
          address_postcode, secret_question, secret_answer, phone, account_opening_reason } = this.state;
        const createAccountParams = {
          salutation, first_name, last_name, date_of_birth, place_of_birth, residence,
          address_line_1, address_line_2, address_city, address_state,
          address_postcode, secret_question, secret_answer, phone, account_opening_reason,
				};

        try {
          this.setState({
                progress: true,
                serverError: false,
            });
            const response = await api.createRealAccount(createAccountParams);
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
		const { salutation, first_name, last_name, date_of_birth, place_of_birth, account_opening_reason, residence, address_line_1, address_line_2, address_city, address_state, address_postcode, secret_question, secret_answer,
			phone, accept_risk, PEPDeclaration, progress, serverError, statesList, hasError, touched, errors } = this.state;
		const { residenceList, boot } = this.props;

		const language = boot.language ? boot.language : 'en';
    const linkToTermsAndConditions = `https://www.binary.com/${language}/terms-and-conditions.html`;

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
						<SelectGroup id="salutation" value={salutation} options={options.salutationOptions} onChange={this.onEntryChange} />
					</div>
          { touched.salutation && <ErrorMsg text={head((errors || {}).salutation)} /> }

					<div className="input-row">
						<InputGroup
							id="first_name"
							value={first_name}
							placeholder="First Name"
							type="text"
							onChange={this.onEntryChange}
							minLength="2"
							maxLength="30"
						/>
					</div>
          { touched.first_name && <ErrorMsg text={head((errors || {}).first_name)} /> }

					<div className="input-row">
						<InputGroup
							id="last_name"
							value={last_name}
							placeholder="Last Name"
							type="text"
							onChange={this.onEntryChange}
							minLength="2"
							maxLength="30"
						/>
					</div>
          { touched.last_name && <ErrorMsg text={head((errors || {}).last_name)} /> }

					<div className="input-row date-of-birth">
						<InputGroup
							id="date_of_birth"
							label="Date of Birth"
							type="date"
							maxLength="10"
							defaultValue={date_of_birth || 'yyyy-mm-dd'}
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
							<option value="" disabled>Address state</option>
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

					<Legend text="Security" />
					<div className="input-row">
						<SelectGroup
							id="secret_question"
							value={secret_question}
							options={options.secretQuestionOptions}
							onChange={this.onEntryChange}
						/>
					</div>
          { touched.secret_question && <ErrorMsg text={head((errors || {}).secret_question)} /> }

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
