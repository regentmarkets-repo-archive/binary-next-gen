import React, { PureComponent } from 'react';
import moment from 'moment';
import validate from 'validate.js';
import head from 'lodash.head';
import { Button, InputGroup, ServerErrorMsg, ErrorMsg } from 'binary-components';
import { getConstraints } from './SettingsSelfExclusion.validation.config';
import UpdateNotice from '../containers/UpdateNotice';
import { api } from '../_data/LiveData';

export default class SettingsSelfExclusion extends PureComponent {

	props: {
		max_balance: number,
		max_turnover: number,
		max_losses: number,
		max_7day_turnover: number,
		max_7day_losses: number,
		max_30day_turnover: number,
		max_30day_losses: number,
		max_open_bets: number,
		session_duration_limit: number,
		timeout_until: number,
		exclude_until: string,
	};

	constructor(props) {
    super(props);
    this.state = {
      max_balance: props.max_balance,
      max_turnover: props.max_turnover,
      max_losses: props.max_losses,
      max_7day_turnover: props.max_7day_turnover,
      max_7day_losses: props.max_7day_losses,
      max_30day_turnover: props.max_30day_turnover,
      max_30day_losses: props.max_30day_losses,
      max_open_bets: props.max_open_bets,
      session_duration_limit: props.session_duration_limit,
      timeout_until_time: props.timeout_until,
      timeout_until_date: props.timeout_until,
      exclude_until: props.exclude_until,
      touched: {
        max_balance: false,
        max_turnover: false,
        max_losses: false,
        max_7day_turnover: false,
        max_7day_losses: false,
        max_30day_turnover: false,
        max_30day_losses: false,
        max_open_bets: false,
        session_duration_limit: false,
        timeout_until_time: false,
        timeout_until_date: false,
        exclude_until: false,
      },
    };
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
					this.updateSelfExclusion();
				}
    }

	updateSelfExclusion = async () => {
		const { max_balance, max_turnover, max_losses, max_7day_turnover, max_7day_losses,
			max_30day_turnover, max_30day_losses, max_open_bets, session_duration_limit,
			timeout_until_time, timeout_until_date, exclude_until } = this.state;
		const timeout_until = moment(timeout_until_date + ' ' + timeout_until_time).valueOf() / 1000;
		const newSelfExclusionSettings = {
			max_balance,
			max_turnover,
			max_losses,
			max_7day_turnover,
			max_7day_losses,
			max_30day_turnover,
			max_30day_losses,
			max_open_bets,
			session_duration_limit,
			exclude_until,
			timeout_until,
		};
		try {
			await api.setSelfExclusion(newSelfExclusionSettings);
			this.setState({
				success: true,
				serverError: false,
			});
			setTimeout(() => {
				this.setState({ success: false });
				api.getSelfExclusion();
				api.getAccountLimits();
				if (exclude_until) {
					window.location.reload();
				}
			}, 3000);
		} catch (e) {
			this.setState({ serverError: e.error.error.message });
		}
	}

	render() {
		const { max_balance, max_turnover, max_losses, max_7day_turnover, max_7day_losses,
			max_30day_turnover, max_30day_losses, max_open_bets, session_duration_limit,
			exclude_until, timeout_until_date, timeout_until_time, success, serverError, hasError, touched, errors } = this.state;
    // const wrongExcludeUntillTime = isValidTime(timeout_until_time);
    return (
			<form className="settings-self-exclusion" onSubmit={this.onFormSubmit}>
			{serverError && <ServerErrorMsg text={serverError} />}
			{hasError && <ErrorMsg text="Please fill the form with valid values" />}
				<UpdateNotice text="Settings updated" show={success} />
				<InputGroup
					id="max_balance"
					name="max_balance"
					label="Maximum account cash balance"
					type="text"
					maxLength="20"
					// hint="Once this limit is reached, you may no longer deposit."
					defaultValue={max_balance}
					onChange={this.onEntryChange}
				/>
				{touched.max_balance && <ErrorMsg text={head((errors || {}).max_balance)} />}
				<InputGroup
					id="max_turnover"
					name="max_turnover"
					label="Daily turnover limit"
					type="text"
					maxLength="20"
					// hint="Maximum aggregate contract purchases per day."
					defaultValue={max_turnover}
					onChange={this.onEntryChange}
				/>
        {touched.max_turnover && <ErrorMsg text={head((errors || {}).max_turnover)} />}
				<InputGroup
					id="max_losses"
					name="max_losses"
					label="Daily limit on losses"
					type="text"
					maxLength="20"
					// hint="Maximum aggregate loss per day."
					defaultValue={max_losses}
					onChange={this.onEntryChange}
				/>
        {touched.max_losses && <ErrorMsg text={head((errors || {}).max_losses)} />}
				<InputGroup
					id="max_7day_turnover"
					name="max_7day_turnover"
					label="7-day turnover limit"
					type="text"
					maxLength="20"
					// hint="Maximum aggregate contract purchases over a 7-day period."
					defaultValue={max_7day_turnover}
					onChange={this.onEntryChange}
				/>
        {touched.max_7day_turnover && <ErrorMsg text={head((errors || {}).max_7day_turnover)} />}
				<InputGroup
					id="max_7day_losses"
					name="max_7day_losses"
					label="7-day limit on losses"
					type="text"
					maxLength="20"
					// hint="Maximum aggregate loss over a 7-day period."
					defaultValue={max_7day_losses}
					onChange={this.onEntryChange}
				/>
        {touched.max_7day_losses && <ErrorMsg text={head((errors || {}).max_7day_losses)} />}
				<InputGroup
					id="max_30day_turnover"
					name="max_30day_turnover"
					label="30-day turnover limit"
					type="text"
					maxLength="20"
					// hint="Maximum aggregate contract purchases over a 30-day period."
					defaultValue={max_30day_turnover}
					onChange={this.onEntryChange}
				/>
        {touched.max_30day_turnover && <ErrorMsg text={head((errors || {}).max_30day_turnover)} />}
				<InputGroup
					id="max_30day_losses"
					name="max_30day_losses"
					label="30-day limit on losses"
					type="text"
					maxLength="20"
					// hint="Maximum aggregate loss over a 30-day period."
					defaultValue={max_30day_losses}
					onChange={this.onEntryChange}
				/>
        {touched.max_30day_losses && <ErrorMsg text={head((errors || {}).max_30day_losses)} />}
				<InputGroup
					id="max_open_bets"
					name="max_open_bets"
					label="Maximum number of open positions"
					type="number"
					maxLength="4"
					defaultValue={max_open_bets}
					onChange={this.onEntryChange}
				/>
        {touched.max_open_bets && <ErrorMsg text={head((errors || {}).max_open_bets)} />}
				<InputGroup
					id="session_duration_limit"
					name="session_duration_limit"
					label="Session duration limit, in minutes"
					type="number"
					maxLength="5"
					// hint="You will be automatically logged out after such time."
					defaultValue={session_duration_limit}
					onChange={this.onEntryChange}
				/>
        {touched.session_duration_limit && <ErrorMsg text={head((errors || {}).session_duration_limit)} />}
				<InputGroup
					id="timeout_until_date"
					name="timeout_until_date"
					label="Time out until date"
					type="date"
					maxLength="10"
					defaultValue={timeout_until_date || 'yyyy-mm-dd'}
					onChange={this.onEntryChange}
				/>
        {touched.timeout_until_date && <ErrorMsg text={head((errors || {}).timeout_until_date)} />}
				<InputGroup
					id="timeout_until_time"
					name="timeout_until_time"
					label="Time out until time"
					type="time"
					maxLength="8"
					defaultValue={timeout_until_time || '--:--:--'}
					onChange={this.onEntryChange}
				/>
        {touched.timeout_until_time && <ErrorMsg text={head((errors || {}).timeout_until_time)} />}
				<InputGroup
					id="exclude_until"
					name="exclude_until"
					label="Exclude me from the website until"
					type="date"
					maxLength="10"
					defaultValue={exclude_until || 'yyyy-mm-dd'}
					onChange={this.onEntryChange}
				/>
        {touched.exclude_until && <ErrorMsg text={head((errors || {}).exclude_until)} />}
				<Button text="Update" />
			</form>
		);
	}
}
