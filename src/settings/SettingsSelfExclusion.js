import React, { PureComponent } from 'react';
import moment from 'moment';
import approve from 'approvejs';
import { Button, InputGroup, ServerErrorMsg, ErrorMsg } from 'binary-components';
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
    };

    this.result = {};

    this.rules = {
      max_balance: {
        stop: true,
        required: {
          required: true,
          message: 'This field is required',
				},
        numeric: {
          numeric: true,
          message: 'Should be a valid number',
        },
        valueRange: {
          minValue: 0,
          maxValue: props.max_balance,
        },
      },
      max_turnover: {
        stop: true,
        required: {
          required: true,
          message: 'This field is required',
        },
        numeric: {
          numeric: true,
          message: 'Should be a valid number',
        },
        valueRange: {
          minValue: 0,
          maxValue: props.max_turnover,
        },
      },
      max_losses: {
        stop: true,
        required: {
          required: true,
          message: 'This field is required',
        },
        numeric: {
          numeric: true,
          message: 'Should be a valid number',
        },
        valueRange: {
          minValue: 0,
          maxValue: props.max_losses,
        },
      },
      max_7day_turnover: {
        stop: true,
        required: {
          required: true,
          message: 'This field is required',
        },
        numeric: {
          numeric: true,
          message: 'Should be a valid number',
        },
        valueRange: {
          minValue: 0,
          maxValue: props.max_7day_turnover,
        },
      },
      max_7day_losses: {
        stop: true,
        required: {
          required: true,
          message: 'This field is required',
        },
        numeric: {
          numeric: true,
          message: 'Should be a valid number',
        },
        valueRange: {
          minValue: 0,
          maxValue: props.max_7day_losses,
        },
      },
      max_30day_turnover: {
        stop: true,
        required: {
          required: true,
          message: 'This field is required',
        },
        numeric: {
          numeric: true,
          message: 'Should be a valid number',
        },
        valueRange: {
          minValue: 0,
          maxValue: props.max_30day_turnover,
        },
      },
      max_30day_losses: {
        stop: true,
        required: {
          required: true,
          message: 'This field is required',
        },
        numeric: {
          numeric: true,
          message: 'Should be a valid number',
        },
        valueRange: {
          minValue: 0,
          maxValue: props.max_30day_losses,
        },
      },
      max_open_bets: {
        stop: true,
        required: {
          required: true,
          message: 'This field is required',
        },
        numeric: {
          numeric: true,
          message: 'Should be a valid number',
        },
        valueRange: {
          minValue: 0,
          maxValue: props.max_open_bets,
        },
      },
      session_duration_limit: {
        stop: true,
        required: {
          required: true,
          message: 'This field is required',
        },
        numeric: {
          numeric: true,
          message: 'Should be a valid number',
        },
        valueRange: {
          minValue: 0,
          maxValue: props.session_duration_limit,
        },
      },
      timeout_until_date: {
        stop: true,
        beforeWeeks: {
          n: 6,
        }
      },

    };

    this.valueRange = {
      expects: [
        'minValue',
        'maxValue',
      ],
      message: 'Should be between {minValue} and {maxValue}',
      validate(value, pars) {
        return value <= pars.maxValue && value > pars.minValue;
      },
    };

    this.beforeWeeks = {
      expects: [
        'n',
      ],
      message: 'Time out must be after today and cannot be more than {n} weeks.',
      validate(value, pars) {
        return !(moment(value).isAfter(moment().subtract(1, 'days')) && moment(value).isBefore(moment().add(6, 'weeks')));
      },
    };

    approve.addTest(this.valueRange, 'valueRange');
    approve.addTest(this.beforeWeeks, 'beforeWeeks');
  }

  onEntryChange = (e: SyntheticEvent) => {
    this.setState({ [e.target.id]: e.target.value });
    this.result[e.target.id] = approve.value(this.state[e.target.id], this.rules[e.target.id]);
    console.log(this.result);
	}

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
				{this.result && this.result.max_balance && this.result.max_balance.errors && <ErrorMsg text={this.result.max_balance.errors[0]} />}
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
        {this.result && this.result.max_turnover && this.result.max_turnover.errors && <ErrorMsg text={this.result.max_turnover.errors[0]} />}
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
        {this.result && this.result.max_losses && this.result.max_losses.errors && <ErrorMsg text={this.result.max_losses.errors[0]} />}
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
        {this.result && this.result.max_7day_turnover && this.result.max_7day_turnover.errors && <ErrorMsg text={this.result.max_7day_turnover.errors[0]} />}
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
        {this.result && this.result.max_7day_losses && this.result.max_7day_losses.errors && <ErrorMsg text={this.result.max_7day_losses.errors[0]} />}
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
        {this.result && this.result.max_30day_turnover && this.result.max_30day_turnover.errors && <ErrorMsg text={this.result.max_30day_turnover.errors[0]} />}
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
        {this.result && this.result.max_30day_losses && this.result.max_30day_losses.errors && <ErrorMsg text={this.result.max_30day_losses.errors[0]} />}
				<InputGroup
					id="max_open_bets"
					label="Maximum number of open positions"
					// type="number"
					type="text"
					maxLength="4"
					defaultValue={max_open_bets}
					onChange={this.onEntryChange}
				/>
        {this.result && this.result.max_open_bets && this.result.max_open_bets.errors && <ErrorMsg text={this.result.max_open_bets.errors[0]} />}
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
        {this.result && this.result.session_duration_limit && this.result.session_duration_limit.errors && <ErrorMsg text={this.result.session_duration_limit.errors[0]} />}
				<InputGroup
					id="timeout_until_date"
					label="Time out until date"
					type="date"
					maxLength="10"
					defaultValue={timeout_until_date || 'yyyy-mm-dd'}
					onChange={this.onEntryChange}
				/>
        {this.result && this.result.timeout_until_date && this.result.timeout_until_date.errors && <ErrorMsg text={this.result.timeout_until_date.errors[0]} />}
				<InputGroup
					id="timeout_until_time"
					label="Time out until time"
					type="time"
					maxLength="8"
					defaultValue={timeout_until_time || '--:--:--'}
					onChange={this.onEntryChange}
				/>
        {this.result && this.result.timeout_until_time && this.result.timeout_until_time.errors && <ErrorMsg text={this.result.timeout_until_time.errors[0]} />}
				<InputGroup
					id="exclude_until"
					label="Exclude me from the website until"
					type="date"
					maxLength="10"
					defaultValue={exclude_until || 'yyyy-mm-dd'}
					onChange={this.onEntryChange}
				/>
        {this.result && this.result.exclude_until && this.result.exclude_until.errors && <ErrorMsg text={this.result.exclude_until.errors[0]} />}
				<Button text="Update" />
			</form>
    );
  }
}
