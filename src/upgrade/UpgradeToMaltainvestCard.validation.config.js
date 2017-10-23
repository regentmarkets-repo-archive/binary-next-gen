import validate from 'validate.js/validate.min';

/*eslint-disable */
validate.validators.validateAddress = (value) => {
  if(/[`~!$%^&*_=+[}{\]\\"?><|]+/.test(value)) {
    return 'Only letters, numbers, space, and these special characters are allowed: - . \' # ; : ( ) , @ /';
  }
}

validate.validators.validateGeneral = (value) => {
  if(/[`~!@#$%^&*)(_=+[}{\]\\/";:?><|]+/.test(value)) {
    return 'Only letters, space, hyphen, period, and apostrophe are allowed.';
  }
}
/*eslint-enable */

export const getConstraints = (props) => {
  const constraints = {
    salutation: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    first_name: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
      validateGeneral: true,
    },
    last_name: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
      validateGeneral: true,
    },
    residence: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    address_line_1: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
      validateAddress: true,
    },
    address_line_2: {
      validateAddress: true,
    },
    address_city: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
      validateGeneral: true,
    },
    address_state: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    place_of_birth: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    date_of_birth: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    address_postcode: {
      format: {
        /*eslint-disable */
        pattern: /^([a-zA-Z\d-\s])*$/,
        /*eslint-enable */
        message: 'Only letters, numbers, space, and hyphen are allowed.',
      },
    },
    phone: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
      format: {
        /*eslint-disable */
        pattern: /^\+?[0-9\s]*$/,
        /*eslint-enable */
        message: 'Only numbers and spaces are allowed.',
      },
    },
    forex_trading_experience: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    forex_trading_frequency: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    indices_trading_experience: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    indices_trading_frequency: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    commodities_trading_experience: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    commodities_trading_frequency: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    stocks_trading_experience: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    stocks_trading_frequency: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    other_derivatives_trading_experience: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    other_derivatives_trading_frequency: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    other_instruments_trading_experience: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    other_instruments_trading_frequency: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    employment_industry: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    occupation: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    education_level: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    income_source: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    net_income: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    estimated_worth: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    tax_residence: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    tax_identification_number: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
      format: {
        /*eslint-disable */
        pattern: /^[\w-]{0,20}$/,
        /*eslint-enable */
        message: 'Only letters, numbers, space, and hyphen are allowed.',
      },
    },
    account_turnover: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    account_opening_reason: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    source_of_wealth: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    secret_question: {
      presence: () => {
        if (props.loginid.startsWith('VRTC')) {
          return {
            presence: true,
            message: 'This field is required.',
          };
        }
        return false;
      },
    },
    secret_answer: {
      presence: () => {
        if (props.loginid.startsWith('VRTC')) {
          return {
            presence: true,
            message: 'This field is required.',
          };
        }
        return false;
      },
      format: () => {
        if (props.loginid.startsWith('VRTC')) {
          return {
            /*eslint-disable */
            pattern: /^[\w\-\,\.\' ]+/,
            /*eslint-enable */
            message: 'Only letters, numbers, space, hyphen, period, and apostrophe are allowed.',
          };
        }
        return false;
      },
    },
  };
  return constraints;
};
