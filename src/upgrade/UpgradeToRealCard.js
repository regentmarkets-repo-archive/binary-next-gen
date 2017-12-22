import React, { PureComponent } from 'react';
import moment from 'moment';
import {
	M, InputGroup, SelectGroup, LogoSpinner, Legend, Button,
	ErrorMsg, ServerErrorMsg, Countries
} from 'binary-components';
import { api } from '../_data/LiveData';
import { getConstraints } from './UpgradeToRealCard.validation.config';
import options from './UpgradeCard.options';
import ValidationManager from '../_utils/ValidationManager';
import { addNewAccount } from '../_utils/AccountHelpers';
import { store } from '../_store/persistentStore';
import { updateUpgradeField } from '../_actions/UpgradeActions';

export default class UpgradeToRealCard extends PureComponent {

	static contextTypes = {
		router: () => undefined,
	}

	props: {
		residenceList: any[],
		boot: any[],
		loginid: string,
		country_code: string,
		states: any[],
		selectedCurrency: string,
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
		account_opening_reason: string,
	};

	constructor(props) {
		super(props);
		this.state = {
			hasError: false,
			progress: false,
			serverError: false,
			statesList: props.states,
			errors: {},
			formData: {
				residence: props.country_code,
                salutation: props.salutation,
                first_name: props.first_name,
                last_name: props.last_name,
                date_of_birth: moment.unix(this.props.date_of_birth).format('YYYY-MM-DD') || '1980-01-01',
                place_of_birth: props.place_of_birth,
                address_line_1: props.address_line_1,
                address_line_2: props.address_line_2,
                address_city: props.address_city,
                address_state: props.address_state,
                address_postcode: props.address_postcode,
                secret_question: props.secret_question,
                secret_answer: props.secret_answer,
                phone: props.phone,
				account_opening_reason: props.account_opening_reason,
			}
		};
		this.constraints = getConstraints();
		this.validationMan = new ValidationManager(this.constraints);
	}

	componentWillReceiveProps(nextProps: props) {
		const formData = this.state.formData;
		let statesList = this.state.statesList;
		if (!nextProps.phone && nextProps.country_code) {
			const countryInResidenceList = nextProps.residenceList.find(country => country.value === nextProps.country_code);
			formData.phone = countryInResidenceList && countryInResidenceList.phone_idd ? `+${countryInResidenceList.phone_idd}` : '';
		}
		if (this.state.statesList.length === 0) {
			statesList = nextProps.states;
		}
		this.setState({ statesList, formData });
	}

	componentWillUnmount() {
    store.dispatch(updateUpgradeField('selected_currency', ''));
	}

	onEntryChange = (e: SyntheticEvent) => {
		const s = this.validationMan.validateFieldAndGetNewState(e, this.state.formData);
		this.setState({ ...s, hasError: false });
	}

	onCountryChange = (e: SyntheticEvent) => {
		this.onEntryChange(e);
		const formData = this.state.formData;
		const countryInResidenceList = this.props.residenceList.find(country => country.value === this.props.country_code);
		formData.phone = countryInResidenceList ? `+${countryInResidenceList.phone_idd}` : '';
		api.getStatesForCountry(e.target.value).then(response =>
			this.setState({ statesList: response.states_list, formData })
		);
	}

	onFormSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		const newErrors = this.validationMan.validateAll(this.state.formData);
		this.setState({ errors: newErrors });
		const keys = Object.keys(newErrors);
		if (keys.length > 0) {
			document.getElementById(keys[0]).scrollIntoView({ block: 'center', behavior: 'smooth' });
			this.setState({ hasError: true });
		} else {
			this.performUpgrade();
		}
	}

	performUpgrade = async () => {
		const loginid = this.props.loginid;
		// PEPDeclaration and accept_risk are not required for upgrade
		const { PEPDeclaration, accept_risk, ...formData } = this.state.formData; // eslint-disable-line no-unused-vars
    if (this.props.selectedCurrency && this.props.selectedCurrency !== '') {
      formData.currency = this.props.selectedCurrency;
		}
    let createAccountParams = formData;
    // if not VRTC, we do not need secret question
    if (!loginid.startsWith('VRTC')) {
      const { secret_question, secret_answer, ...d } = formData; // eslint-disable-line no-unused-vars
     createAccountParams = d;
    }

    try {
			this.setState({
				progress: true,
				serverError: false,
			});
			const response = await api.createRealAccount(createAccountParams);
			addNewAccount(response.new_account_real);
			if (this.props.selectedCurrency && this.props.selectedCurrency !== '') {
				this.context.router.replace('/');
			} else {
				this.context.router.replace('/set-currency');
			}
			window.location.reload();
		} catch (e) {
			this.setState({ serverError: e.error.error.message });
		} finally {
			this.setState({
				progress: false,
			});
		}
	}

	render() {
		const { formData, progress, serverError, statesList, hasError, errors } = this.state;
		const { residenceList, boot, loginid } = this.props;

		const language = (boot.language || 'en').toLowerCase();
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
						<SelectGroup
							id="salutation"
							value={formData.salutation || ''}
							options={options.salutationOptions}
							onChange={this.onEntryChange}
                            disabled={this.props.salutation}
						/>
					</div>
					{errors.salutation && <ErrorMsg text={errors.salutation[0]} />}

					<div className="input-row">
						<InputGroup
							id="first_name"
							value={formData.first_name || ''}
							placeholder="First Name"
							type="text"
							onChange={this.onEntryChange}
							minLength="2"
							maxLength="30"
                            readOnly={this.props.first_name}
						/>
					</div>
					{errors.first_name && <ErrorMsg text={errors.first_name[0]} />}

					<div className="input-row">
						<InputGroup
							id="last_name"
							value={formData.last_name || ''}
							placeholder="Last Name"
							type="text"
							onChange={this.onEntryChange}
							minLength="2"
							maxLength="30"
                            readOnly={this.props.last_name}
						/>
					</div>
					{errors.last_name && <ErrorMsg text={errors.last_name[0]} />}

					<div className="input-row date-of-birth">
						<InputGroup
                            id="date_of_birth"
                            disabled={this.props.date_of_birth}
                            label="Date of Birth"
                            type="date"
                            maxLength="10"
                            value={formData.date_of_birth || 'yyyy-mm-dd'}
                            onChange={this.onEntryChange}
						/>
					</div>
					{errors.date_of_birth && <ErrorMsg text={errors.date_of_birth[0]} />}

					<div className="input-row">
						<select id="place_of_birth" onChange={this.onEntryChange} value={formData.place_of_birth || ''}>
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
					{errors.place_of_birth && <ErrorMsg text={errors.place_of_birth[0]} />}

					<div className="input-row">
						<SelectGroup
							label="Account opening reason"
							value={formData.account_opening_reason || ''}
							id="account_opening_reason"
							options={options.accountOpeningReasonOptions}
							onChange={this.onEntryChange}
						/>
					</div>
					{errors.account_opening_reason && <ErrorMsg text={errors.account_opening_reason[0]} />}

					<Legend text="Home Address" />
					<div className="input-row">
                        <Countries
                            id="residence"
                            value={formData.residence || ''}
                            onChange={this.onCountryChange}
                            residenceList={residenceList}
                            disabled={this.props.country_code}
                        />
						{errors.residence && <ErrorMsg text={errors.residence[0]} />}

						<select id="address_state" onChange={this.onEntryChange} value={formData.address_state} defaultValue="">
							<option value="" disabled>Address state</option>
							{statesList.map(x => (
								<option key={x.value} value={x.value}>{x.text}</option>
							))}
						</select>
					</div>
					{errors.address_state && <ErrorMsg text={errors.address_state[0]} />}

					<div className="input-row">
						<InputGroup
							id="address_city"
							value={formData.address_city || ''}
							placeholder="Town/City"
							type="text"
							maxLength="35"
							onChange={this.onEntryChange}
						/>
					</div>
					{errors.address_city && <ErrorMsg text={errors.address_city[0]} />}

					<div className="input-row">
						<InputGroup
							id="address_postcode"
							value={formData.address_postcode || ''}
							placeholder="Postal Code / ZIP"
							type="text"
							maxLength="20"
							onChange={this.onEntryChange}
						/>
					</div>
					{errors.address_postcode && <ErrorMsg text={errors.address_postcode[0]} />}

					<div className="input-row">
						<InputGroup
							id="address_line_1"
							value={formData.address_line_1 || ''}
							placeholder="Address First Line"
							type="text"
							maxLength="70"
							onChange={this.onEntryChange}
						/>
					</div>
					{errors.address_line_1 && <ErrorMsg text={errors.address_line_1[0]} />}

					<div className="input-row">
						<InputGroup
							id="address_line_2"
							value={formData.address_line_2 || ''}
							placeholder="Address Second Line"
							type="text"
							maxLength="70"
							onChange={this.onEntryChange}
						/>
					</div>
					{errors.address_line_2 && <ErrorMsg text={errors.address_line_2[0]} />}

					<div className="input-row">
						<InputGroup
							id="phone"
							value={formData.phone || ''}
							placeholder="Phone"
							type="tel"
							minLength="6"
							maxLength="35"
							label="phone"
							onChange={this.onEntryChange}
						/>
					</div>
					{errors.phone && <ErrorMsg text={errors.phone[0]} />}
                    {loginid.startsWith('VRTC') &&
						<div>
							<Legend text="Security" />
							<div className="input-row">
								<SelectGroup
									id="secret_question"
									value={formData.secret_question || ''}
									options={options.secretQuestionOptions}
									onChange={this.onEntryChange}
								/>
							</div>
							{errors.secret_question && <ErrorMsg text={errors.secret_question[0]} />}

							<div className="input-row">
								<InputGroup
									id="secret_answer"
									value={formData.secret_answer || ''}
									placeholder="Answer To Secret Question"
									type="text"
									minLength="4"
									maxLength="50"
									onChange={this.onEntryChange}
								/>
							</div>
							{errors.secret_answer && <ErrorMsg text={errors.secret_answer[0]} />}
						</div>
                    }

					<Legend text="PEP Declaration" />
					<M m="A PEP is an individual who is or has been entrusted with a prominent public function. This status extends to a PEP's relatives and close associates." />
					<div className="input-row">
						<label htmlFor="PEPDeclaration">
							<input
								id="PEPDeclaration"
								type="checkbox"
								onChange={this.onEntryChange}
								value="1"
							/>
							<M m="I acknowledge that I am not a politically exposed person (PEP)." />&nbsp;
						</label>
					</div>
					{errors.PEPDeclaration && <ErrorMsg text={errors.PEPDeclaration[0]} />}

					<M m="The financial trading services contained within this site are only suitable for customers who are able to bear the loss of all the money they invest and who understand and have experience of the risk involved in the acquistion of financial contracts. Transactions in financial contracts carry a high degree of risk. If purchased contracts expire worthless, you will suffer a total loss of your investment, which consists of the contract premium." />
					<div className="input-row">
						<label htmlFor="accept_risk">
							<input
								id="accept_risk"
								type="checkbox"
								onChange={this.onEntryChange}
								value="1"
							/>
							<M m="I agree to the" />&nbsp;
							<a href={linkToTermsAndConditions} target="_blank" rel="noopener noreferrer">
								<M m="terms and conditions" />
							</a>
						</label>
					</div>
					{errors.accept_risk && <ErrorMsg text={errors.accept_risk[0]} />}

					<Button disabled={progress} text="Open Account" />
				</form>
			</div>
		);
	}
}
