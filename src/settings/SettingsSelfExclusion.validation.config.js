import moment from 'moment';
import validate from 'validate.js';

  /* eslint-disable consistent-return */
validate.validators.timeoutUntilDateValidation = (value) => {
  if (!moment(value).isAfter(moment().subtract(1, 'days'), 'day') || !moment(value).isBefore(moment().add(6, 'weeks'))) {
    return 'Time out must be after today and cannot be more than 6 weeks.';
  }
};
validate.validators.timeoutUntilTimeValidation = (value, options) => {
  const timeout_until = moment(options.timeout_until_date + ' ' + value).valueOf() / 1000;
  if (timeout_until <= moment().valueOf() / 1000) {
    return 'Time out cannot be in the past.';
  }
};
validate.validators.timeoutUntilTimeRequired = (value, options) => {
  if (options.timeout_until_date && !value) {
    return 'This field is required.';
  }
};
validate.validators.excludeUntilValidation = (value) => {
  if (moment(value).isBefore(moment().add(6, 'months')) || moment(value).isAfter(moment().add(5, 'years'))) {
    return 'Exclude time cannot be less than 6 months and more than 5 years.';
  }
};
/* eslint-enable consistent-return */

export const getConstraints = props => {
  const constraints = {
    max_balance: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
      numericality: {
        onlyInteger: true,
        notInteger: 'Should be a valid number',
        notValid: 'Should be a valid number',
        lessThanOrEqualTo: props.max_balance,
        notLessThanOrEqualTo: 'Should be between 0 and {props.max_balance}'
      },
    },
    max_turnover: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
      numericality: {
        onlyInteger: true,
        notInteger: 'Should be a valid number',
        notValid: 'Should be a valid number',
        lessThanOrEqualTo: props.max_turnover,
        notLessThanOrEqualTo: 'Should be between 0 and {props.max_turnover}'
      },
    },
    max_losses: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
      numericality: {
        onlyInteger: true,
        notInteger: 'Should be a valid number',
        notValid: 'Should be a valid number',
        lessThanOrEqualTo: props.max_losses,
        notLessThanOrEqualTo: 'Should be between 0 and {props.max_losses}'
      },
    },
    max_7day_turnover: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
      numericality: {
        onlyInteger: true,
        notInteger: 'Should be a valid number',
        notValid: 'Should be a valid number',
        lessThanOrEqualTo: props.max_7day_turnover,
        notLessThanOrEqualTo: 'Should be between 0 and {props.max_7day_turnover}'
      },
    },
    max_7day_losses: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
      numericality: {
        onlyInteger: true,
        notInteger: 'Should be a valid number',
        notValid: 'Should be a valid number',
        lessThanOrEqualTo: props.max_7day_losses,
        notLessThanOrEqualTo: 'Should be between 0 and {props.max_7day_losses}'
      },
    },
    max_30day_turnover: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
      numericality: {
        onlyInteger: true,
        notInteger: 'Should be a valid number',
        notValid: 'Should be a valid number',
        lessThanOrEqualTo: props.max_30day_turnover,
        notLessThanOrEqualTo: 'Should be between 0 and {props.max_30day_turnover}'
      },
    },
    max_30day_losses: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
      numericality: {
        onlyInteger: true,
        notInteger: 'Should be a valid number',
        notValid: 'Should be a valid number',
        lessThanOrEqualTo: props.max_30day_losses,
        notLessThanOrEqualTo: 'Should be between 0 and {props.max_30day_losses}'
      },
    },
    max_open_bets: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
      numericality: {
        onlyInteger: true,
        notInteger: 'Should be a valid number',
        notValid: 'Should be a valid number',
        lessThanOrEqualTo: props.max_open_bets,
        notLessThanOrEqualTo: 'Should be between 0 and {props.max_open_bets}'
      },
    },
    session_duration_limit: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
      numericality: {
        onlyInteger: true,
        notInteger: 'Should be a valid number',
        notValid: 'Should be a valid number',
        lessThanOrEqualTo: props.session_duration_limit,
        notLessThanOrEqualTo: 'Should be between 0 and {props.session_duration_limit}'
      },
    },
    timeout_until_date: {
      timeoutUntilDateValidation: true,
    },
    timeout_until_time: {
      timeoutUntilTimeRequired: {
        timeout_until_date: props.timeout_until_date,
      },
      timeoutUntilTimeValidation: {
        timeout_until_date: props.timeout_until_date,
      },
    },
    exclude_until: {
      excludeUntilValidation: true,
    },
  };
  return constraints;
};

