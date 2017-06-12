import React, { PureComponent } from 'react';
import moment from 'moment';
import { Button, InputGroup, ServerErrorMsg, ErrorMsg } from 'binary-components';
import UpdateNotice from '../containers/UpdateNotice';
import { api } from '../_data/LiveData';

function validate(props, state, max_balance, max_turnover, max_losses, max_7day_turnover, max_7day_losses, max_30day_turnover, max_30day_losses, max_open_bets, session_duration_limit, timeout_until_date, timeout_until_time, exclude_until) {
  const timeout_until = moment(timeout_until_date + ' ' + timeout_until_time).valueOf() / 1000;

  return {
    max_balance_required: state.touched.max_balance && !max_balance,
    max_balance: state.touched.max_balance && !(/^\d{0,20}$/).test(max_balance),
    max_balance_limit: state.touched.max_balance && max_balance > props.max_balance,
    max_balance_limit_text: props.max_balance,
    max_turnover_required: state.touched.max_turnover && !max_turnover,
    max_turnover: state.touched.max_turnover && !(/^\d{0,20}$/).test(max_turnover),
    max_turnover_limit: state.touched.max_turnover && max_turnover > props.max_turnover,
    max_turnover_limit_text: props.max_turnover,
    max_losses_required: state.touched.max_losses && !max_losses,
    max_losses: state.touched.max_losses && !(/^\d{0,20}$/).test(max_losses),
    max_losses_limit: state.touched.max_losses && max_losses > props.max_losses,
    max_losses_limit_text: props.max_losses,
    max_7day_turnover_required: state.touched.max_7day_turnover && !max_7day_turnover,
    max_7day_turnover: state.touched.max_7day_turnover && !(/^\d{0,20}$/).test(max_7day_turnover),
    max_7day_turnover_limit: state.touched.max_7day_turnover && max_7day_turnover > props.max_7day_turnover,
    max_7day_turnover_limit_text: props.max_7day_turnover,
    max_7day_losses_required: state.touched.max_7day_losses && !max_7day_losses,
    max_7day_losses: state.touched.max_7day_losses && !(/^\d{0,20}$/).test(max_7day_losses),
    max_7day_losses_limit: state.touched.max_7day_losses && max_7day_losses > props.max_7day_losses,
    max_7day_losses_limit_text: props.max_7day_losses,
    max_30day_turnover_required: state.touched.max_30day_turnover && !max_30day_turnover,
    max_30day_turnover: state.touched.max_30day_turnover && !(/^\d{0,20}$/).test(max_30day_turnover),
    max_30day_turnover_limit: state.touched.max_30day_turnover && max_30day_turnover > props.max_30day_turnover,
    max_30day_turnover_limit_text: props.max_30day_turnover,
    max_30day_losses_required: state.touched.max_30day_losses && !max_30day_losses,
    max_30day_losses: state.touched.max_30day_losses && !(/^\d{0,20}$/).test(max_30day_losses),
    max_30day_losses_limit: state.touched.max_30day_losses && max_30day_losses > props.max_30day_losses,
    max_30day_losses_limit_text: props.max_30day_losses,
    max_open_bets_required: state.touched.max_open_bets && !max_open_bets,
    max_open_bets: state.touched.max_open_bets && !(/^\d{0,4}$/).test(max_open_bets),
    max_open_bets_limit: state.touched.max_open_bets && max_open_bets > props.max_open_bets,
    max_open_bets_limit_text: props.max_open_bets,
    session_duration_limit_required: state.touched.session_duration_limit && !session_duration_limit,
    session_duration_limit: state.touched.session_duration_limit && !(/^\d{0,5}$/).test(session_duration_limit),
    session_duration_limit_limit: state.touched.session_duration_limit && session_duration_limit > props.session_duration_limit,
    session_duration_limit_limit_text: props.session_duration_limit,
    timeout_until_date_limit: state.touched.timeout_until_date && !(moment(timeout_until_date).isAfter(moment().subtract(1, 'days')) && moment(timeout_until_date).isBefore(moment().add(6, 'weeks'))),
    timeout_until_time_required: !timeout_until_time,
    timeout_until_time_limit: timeout_until < moment().valueOf() / 1000,
    exclude_until_limit: state.touched.exclude_until && !(moment(exclude_until).isAfter(moment().add(6, 'months')) && moment(exclude_until).isBefore(moment().add(5, 'years'))),
  };
}

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

  onEntryChange = (e: SyntheticEvent) =>
    this.setState({ [e.target.id]: e.target.value,
      touched: { ...this.state.touched, [e.target.id]: true },
    });

  onFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    this.setState({
      validatedOnce: true,
    });
    this.updateSelfExclusion();
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
      exclude_until, timeout_until_date, timeout_until_time, success, serverError } = this.state;
    // const wrongExcludeUntillTime = isValidTime(timeout_until_time);
    const errors = validate(this.props, this.state, this.state.max_balance, this.state.max_turnover, this.state.max_losses, this.state.max_7day_turnover, this.state.max_7day_losses, this.state.max_30day_turnover, this.state.max_30day_losses, this.state.max_open_bets, this.state.session_duration_limit, this.state.timeout_until_date, this.state.timeout_until_time, this.state.exclude_until);

    return (
			<form className="settings-self-exclusion" onSubmit={this.onFormSubmit}>
        {serverError && <ServerErrorMsg text={serverError} />}
				<UpdateNotice text="Settings updated" show={success} />
				<InputGroup
					id="max_balance"
					label="Maximum account cash balance"
					// type="number"
					// hint="Once this limit is reached, you may no longer deposit."
					type="text"
					maxLength="20"
					defaultValue={max_balance}
					onChange={this.onEntryChange}
				/>
        {errors.max_balance_required && <ErrorMsg text="This field is required" />}
        {errors.max_balance && <ErrorMsg text="Should be a valid number" />}
        {errors.max_balance_limit && <ErrorMsg text={`Should be between 0 and ${errors.max_balance_limit_text}`} />}
				<InputGroup
					id="max_turnover"
					label="Daily turnover limit"
					// type="number"
					// hint="Maximum aggregate contract purchases per day."
					type="text"
					maxLength="20"
					defaultValue={max_turnover}
					onChange={this.onEntryChange}
				/>
        {errors.max_turnover_required && <ErrorMsg text="This field is required" />}
        {errors.max_turnover && <ErrorMsg text="Should be a valid number" />}
        {errors.max_turnover_limit && <ErrorMsg text={`Should be between 0 and ${errors.max_turnover_limit_text}`} />}
				<InputGroup
					id="max_losses"
					label="Daily limit on losses"
					// type="number"
					// hint="Maximum aggregate loss per day."
					type="text"
					maxLength="20"
					defaultValue={max_losses}
					onChange={this.onEntryChange}
				/>
        {errors.max_losses_required && <ErrorMsg text="This field is required" />}
        {errors.max_losses && <ErrorMsg text="Should be a valid number" />}
        {errors.max_losses_limit && <ErrorMsg text={`Should be between 0 and ${errors.max_losses_limit_text}`} />}
				<InputGroup
					id="max_7day_turnover"
					label="7-day turnover limit"
					// type="number"
					// hint="Maximum aggregate contract purchases over a 7-day period."
					type="text"
					maxLength="20"
					defaultValue={max_7day_turnover}
					onChange={this.onEntryChange}
				/>
        {errors.max_7day_turnover_required && <ErrorMsg text="This field is required" />}
        {errors.max_7day_turnover && <ErrorMsg text="Should be a valid number" />}
        {errors.max_7day_turnover_limit && <ErrorMsg text={`Should be between 0 and ${errors.max_7day_turnover_limit_text}`} />}
				<InputGroup
					id="max_7day_losses"
					label="7-day limit on losses"
					// type="number"
					// hint="Maximum aggregate loss over a 7-day period."
					type="text"
					maxLength="20"
					defaultValue={max_7day_losses}
					onChange={this.onEntryChange}
				/>
        {errors.max_7day_losses_required && <ErrorMsg text="This field is required" />}
        {errors.max_7day_losses && <ErrorMsg text="Should be a valid number" />}
        {errors.max_7day_losses_limit && <ErrorMsg text={`Should be between 0 and ${errors.max_7day_losses_limit_text}`} />}
				<InputGroup
					id="max_30day_turnover"
					label="30-day turnover limit"
					// type="number"
					// hint="Maximum aggregate contract purchases over a 30-day period."
					type="text"
					maxLength="20"
					defaultValue={max_30day_turnover}
					onChange={this.onEntryChange}
				/>
        {errors.max_30day_turnover_required && <ErrorMsg text="This field is required" />}
        {errors.max_30day_turnover && <ErrorMsg text="Should be a valid number" />}
        {errors.max_30day_turnover_limit && <ErrorMsg text={`Should be between 0 and ${errors.max_30day_turnover_limit_text}`} />}
				<InputGroup
					id="max_30day_losses"
					label="30-day limit on losses"
					// type="number"
					// hint="Maximum aggregate loss over a 30-day period."
					type="text"
					maxLength="20"
					defaultValue={max_30day_losses}
					onChange={this.onEntryChange}
				/>
        {errors.max_30day_losses_required && <ErrorMsg text="This field is required" />}
        {errors.max_30day_losses && <ErrorMsg text="Should be a valid number" />}
        {errors.max_30day_losses_limit && <ErrorMsg text={`Should be between 0 and ${errors.max_30day_losses_limit_text}`} />}
				<InputGroup
					id="max_open_bets"
					label="Maximum number of open positions"
					// type="number"
					type="text"
					maxLength="4"
					defaultValue={max_open_bets}
					onChange={this.onEntryChange}
				/>
        {errors.max_open_bets_required && <ErrorMsg text="This field is required" />}
        {errors.max_open_bets && <ErrorMsg text="Should be a valid number" />}
        {errors.max_open_bets_limit && <ErrorMsg text={`Should be between 0 and ${errors.max_open_bets_limit_text}`} />}
				<InputGroup
					id="session_duration_limit"
					label="Session duration limit, in minutes"
					// type="number"
					// hint="You will be automatically logged out after such time."
					type="text"
					maxLength="5"
					defaultValue={session_duration_limit}
					onChange={this.onEntryChange}
				/>
        {errors.session_duration_limit_required && <ErrorMsg text="This field is required" />}
        {errors.session_duration_limit && <ErrorMsg text="Should be a valid number" />}
        {errors.session_duration_limit_limit && <ErrorMsg text={`Should be between 0 and ${errors.session_duration_limit_limit_text}`} />}
				<InputGroup
					id="timeout_until_date"
					label="Time out until date"
					type="date"
					maxLength="10"
					defaultValue={timeout_until_date || 'yyyy-mm-dd'}
					onChange={this.onEntryChange}
				/>
        {errors.timeout_until_date_limit && <ErrorMsg text="Time out must be after today and cannot be more than 6 weeks." />}
				<InputGroup
					id="timeout_until_time"
					label="Time out until time"
					type="time"
					maxLength="8"
					defaultValue={timeout_until_time || '--:--:--'}
					onChange={this.onEntryChange}
				/>
        {timeout_until_date && errors.timeout_until_time_required && <ErrorMsg text="This field is required" />}
        {timeout_until_date && errors.timeout_until_time_limit && <ErrorMsg text="Time out cannot be in the past." />}
				<InputGroup
					id="exclude_until"
					label="Exclude me from the website until"
					type="date"
					maxLength="10"
					defaultValue={exclude_until || 'yyyy-mm-dd'}
					onChange={this.onEntryChange}
				/>
        {errors.exclude_until_limit && <ErrorMsg text="Exclude time cannot be less than 6 months and more than 5 years." />}
				<Button text="Update" />
			</form>
    );
  }
}
