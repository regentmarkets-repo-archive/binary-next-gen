import React, { PureComponent } from 'react';
import moment from 'moment';
import validate from 'validate.js/validate.min';
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
      formData: {
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
      },
      errors: {},
      serverError: false,
      success: false,
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

    this.constraints = getConstraints(this.state.formData);
  }

  componentWillReceiveProps = (newProps) => {
    const newState = {};
    if (newProps.max_balance !== this.state.max_balance) newState.max_balance = newProps.max_balance;
    if (newProps.max_turnover !== this.state.max_turnover) newState.max_turnover = newProps.max_turnover;
    if (newProps.max_losses !== this.state.max_losses) newState.max_losses = newProps.max_losses;
    if (newProps.max_7day_turnover !== this.state.max_7day_turnover) newState.max_7day_turnover = newProps.max_7day_turnover;
    if (newProps.max_7day_losses !== this.state.max_7day_losses) newState.max_7day_losses = newProps.max_7day_losses;
    if (newProps.max_30day_turnover !== this.state.max_30day_turnover) newState.max_30day_turnover = newProps.max_30day_turnover;
    if (newProps.max_open_bets !== this.state.max_open_bets) newState.max_open_bets = newProps.max_open_bets;
    if (newProps.session_duration_limit !== this.state.session_duration_limit) newState.session_duration_limit = newProps.session_duration_limit;
    if (newProps.timeout_until_time !== this.state.timeout_until_time) newState.timeout_until_time = newProps.timeout_until_time;
    if (newProps.timeout_until_date !== this.state.timeout_until_date) newState.timeout_until_date = newProps.timeout_until_date;
    if (newProps.exclude_until !== this.state.exclude_until) newState.exclude_until = newProps.exclude_until;
    if (Object.keys(newState).length > 0) this.setState(newState);
  }

  onEntryChange = (e: SyntheticEvent) => {
    // empty input is same as undefined.
    const val = e.target.value === '' ? undefined : e.target.value;
    const newFormData = {
      ...this.state.formData,
      [e.target.id]: val
    };
    const newTouched = {
      ...this.state.touched,
      [e.target.id]: true
    };
    const newErrors = this.validateForm(newFormData);
    this.setState({
      formData: newFormData,
      touched: newTouched,
      errors: newErrors
    });
  }

  componentWillUnmount() {
    clearTimeout(this.hideSuccess);
  }

  validateForm = (newFormData) => {
    const errors = validate(newFormData, this.constraints, {
      format: 'grouped',
      fullMessages: false,
      cleanAttributes: false
    }) || {};
    return errors;
  }

  onFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (Object.keys(this.state.errors).length === 0) {
      this.updateSelfExclusion();
    }
  }

  updateSelfExclusion = async () => {
    const { timeout_until_time, timeout_until_date, ...newSettings } = this.state.formData;
    if (timeout_until_date && timeout_until_time) {
      const timeout_until = moment(timeout_until_date + ' ' + timeout_until_time).valueOf() / 1000;
      newSettings.timeout_until = timeout_until;
    }
    try {
      await api.setSelfExclusion(newSettings);
      this.setState({
        success: true,
        serverError: false,
      });
      api.getSelfExclusion();
      api.getAccountLimits();
      this.hideSuccess = setTimeout(() => {
        this.setState({ success: false });
        if (newSettings.exclude_until || newSettings.timeout_until) {
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
      exclude_until, timeout_until_date, timeout_until_time } = this.state.formData;
    const { success, serverError, touched, errors } = this.state;
    // const wrongExcludeUntillTime = isValidTime(timeout_until_time);
    const timeout_until = touched.timeout_until_date || touched.timeout_until_time;
    return (
      <div className="settings-self-exclusion">
        <form onSubmit={this.onFormSubmit}>
          {serverError && <ServerErrorMsg text={serverError} />}
          {Object.keys(this.state.errors) > 0 && <ErrorMsg text="Please fill the form with valid values" />}
          <UpdateNotice text="Settings updated" show={success} />
          <InputGroup
            id="max_balance"
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
            label="Maximum number of open positions"
            type="number"
            maxLength="4"
            defaultValue={max_open_bets}
            onChange={this.onEntryChange}
          />
          {touched.max_open_bets && <ErrorMsg text={head((errors || {}).max_open_bets)} />}
          <InputGroup
            id="session_duration_limit"
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
            label="Time out until date"
            type="date"
            maxLength="10"
            defaultValue={timeout_until_date || 'yyyy-mm-dd'}
            onChange={this.onEntryChange}
          />
          {timeout_until && <ErrorMsg text={head((errors || {}).timeout_until_date)} />}
          <InputGroup
            id="timeout_until_time"
            label="Time out until time"
            type="time"
            maxLength="8"
            defaultValue={timeout_until_time || '--:--:--'}
            onChange={this.onEntryChange}
          />
          {timeout_until && <ErrorMsg text={head((errors || {}).timeout_until_time)} />}
          <InputGroup
            id="exclude_until"
            label="Exclude me from the website until"
            type="date"
            maxLength="10"
            defaultValue={exclude_until || 'yyyy-mm-dd'}
            onChange={this.onEntryChange}
          />
          {touched.exclude_until && <ErrorMsg text={head((errors || {}).exclude_until)} />}
          <Button text="Update" />
        </form>
      </div>
    );
  }
}
