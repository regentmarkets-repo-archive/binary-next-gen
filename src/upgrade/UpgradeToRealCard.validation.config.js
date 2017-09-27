import validate from 'validate.js';

/*eslint-disable */
validate.validators.validateAddress = (value) => {
  if(/[`~!#$%^&*)(_=+\[}{\]\\";:\?><|]+/.test(value)) {
    return 'Only letters, numbers, space, hyphen, period, and apostrophe are allowed.';
  }
}

validate.validators.validateGeneral = (value) => {
  if(/[`~!@#$%^&*)(_=+\[}{\]\\\/";:\?><,|\d]+/.test(value)) {
    return 'Only letters, space, hyphen, period, and apostrophe are allowed.';
  }
}
/*eslint-enable */

export const getConstraints = () => {
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
    account_opening_reason: {
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
    secret_question: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    secret_answer: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
      format: {
        /*eslint-disable */
        pattern: /^[\w\-\,\.\' ]+/,
        /*eslint-enable */
        message: 'Only letters, numbers, space, hyphen, period, and apostrophe are allowed.',
      }
    },
  };
  return constraints;
};
