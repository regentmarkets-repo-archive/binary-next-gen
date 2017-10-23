import moment from 'moment';
import validate from 'validate.js/validate.min';

  /* eslint-disable consistent-return */
validate.validators.timeoutUntilDateValidation = (value) => {
  if (!!value && (!moment(value).isAfter(moment().subtract(1, 'days'), 'day') || !moment(value).isBefore(moment().add(6, 'weeks')))) {
    return 'Time out must be after today and cannot be more than 6 weeks.';
  }
};
validate.validators.timeoutUntilTimeValidation = (value, options) => {
  const timeout_until = moment(options.timeout_until_date + ' ' + value).valueOf() / 1000;
  if (!!value && timeout_until <= moment().valueOf() / 1000) {
    return 'Time out cannot be in the past.';
  }
};
validate.validators.timeoutUntilTimeRequired = (value, options) => {
  if (options.timeout_until_date && !value) {
    return 'This field is required.';
  }
};
validate.validators.excludeUntilValidation = (value) => {
  if (!!value && moment(value).isBefore(moment())) {
    return 'Exclude time cannot be in the past.';
  } else if (!!value && (moment(value).isBefore(moment().add(6, 'months')) || moment(value).isAfter(moment().add(5, 'years')))) {
    return 'Exclude time cannot be less than 6 months and more than 5 years.';
  }
};

export const getConstraints = (props, state) => {
  const constraints = {
    max_balance: {
      presence: () => {
        if (props.max_balance) {
          return {
            presence: true,
            message: 'This field is required.',
          };
        }
        return false;
      },
      numericality: () => {
        if (state.max_balance) {
          return {
            onlyInteger: true,
            notInteger: 'Should be a valid number',
            notValid: 'Should be a valid number',
            lessThanOrEqualTo: Number(props.max_balance),
            notLessThanOrEqualTo: `Should be between 0 and ${props.max_balance}`
          };
        }
        return false;
      },
    },
    max_turnover: {
      presence: () => {
        if (props.max_turnover) {
          return {
            presence: true,
            message: 'This field is required.',
          };
        }
      },
      numericality: () => {
        if (state.max_turnover) {
          return {
            onlyInteger: true,
            notInteger: 'Should be a valid number',
            notValid: 'Should be a valid number',
            lessThanOrEqualTo: Number(props.max_balance),
            notLessThanOrEqualTo: `Should be between 0 and ${props.max_balance}`
          };
        }
        return false;
      },
    },
    max_losses: {
      presence: () => {
        if (props.max_losses) {
          return {
            presence: true,
            message: 'This field is required.',
          };
        }
      },
      numericality: () => {
        if (state.max_losses) {
          return {
            onlyInteger: true,
            notInteger: 'Should be a valid number',
            notValid: 'Should be a valid number',
            lessThanOrEqualTo: Number(props.max_balance),
            notLessThanOrEqualTo: `Should be between 0 and ${props.max_balance}`
          };
        }
        return false;
      },
    },
    max_7day_turnover: {
      presence: () => {
        if (props.max_7day_turnover) {
          return {
            presence: true,
            message: 'This field is required.',
          };
        }
      },
      numericality: () => {
        if (state.max_7day_turnover) {
          return {
            onlyInteger: true,
            notInteger: 'Should be a valid number',
            notValid: 'Should be a valid number',
            lessThanOrEqualTo: Number(props.max_balance),
            notLessThanOrEqualTo: `Should be between 0 and ${props.max_balance}`
          };
        }
        return false;
      },
    },
    max_7day_losses: {
      presence: () => {
        if (props.max_7day_losses) {
          return {
            presence: true,
            message: 'This field is required.',
          };
        }
      },
      numericality: () => {
        if (state.max_7day_losses) {
          return {
            onlyInteger: true,
            notInteger: 'Should be a valid number',
            notValid: 'Should be a valid number',
            lessThanOrEqualTo: Number(props.max_balance),
            notLessThanOrEqualTo: `Should be between 0 and ${props.max_balance}`
          };
        }
        return false;
      },
    },
    max_30day_turnover: {
      presence: () => {
        if (props.max_30day_turnover) {
          return {
            presence: true,
            message: 'This field is required.',
          };
        }
      },
      numericality: () => {
        if (state.max_30day_turnover) {
          return {
            onlyInteger: true,
            notInteger: 'Should be a valid number',
            notValid: 'Should be a valid number',
            lessThanOrEqualTo: Number(props.max_balance),
            notLessThanOrEqualTo: `Should be between 0 and ${props.max_balance}`
          };
        }
        return false;
      },
    },
    max_30day_losses: {
      presence: () => {
        if (props.max_30day_losses) {
          return {
            presence: true,
            message: 'This field is required.',
          };
        }
      },
      numericality: () => {
        if (state.max_30day_losses) {
          return {
            onlyInteger: true,
            notInteger: 'Should be a valid number',
            notValid: 'Should be a valid number',
            lessThanOrEqualTo: Number(props.max_balance),
            notLessThanOrEqualTo: `Should be between 0 and ${props.max_balance}`
          };
        }
        return false;
      },
    },
    max_open_bets: {
      presence: () => {
        if (props.max_open_bets) {
          return {
            presence: true,
            message: 'This field is required.',
          };
        }
      },
      numericality: () => {
        if (state.max_open_bets) {
          return {
            onlyInteger: true,
            notInteger: 'Should be a valid number',
            notValid: 'Should be a valid number',
            lessThanOrEqualTo: Number(props.max_balance),
            notLessThanOrEqualTo: `Should be between 0 and ${props.max_balance}`
          };
        }
        return false;
      },
    },
    session_duration_limit: {
      presence: () => {
        if (props.session_duration_limit) {
          return {
            presence: true,
            message: 'This field is required.',
          };
        }
      },
      numericality: () => {
        if (state.session_duration_limit) {
          return {
            onlyInteger: true,
            notInteger: 'Should be a valid number',
            notValid: 'Should be a valid number',
            lessThanOrEqualTo: Number(props.max_balance),
            notLessThanOrEqualTo: `Should be between 0 and ${props.max_balance}`
          };
        }
        return false;
      },
    },
    timeout_until_date: {
      timeoutUntilDateValidation: true,
    },
    timeout_until_time: {
      timeoutUntilTimeRequired: {
        timeout_until_date: state.timeout_until_date,
      },
      timeoutUntilTimeValidation: {
        timeout_until_date: state.timeout_until_date,
      },
    },
    exclude_until: {
      excludeUntilValidation: true,
    },
  };
  return constraints;
};

