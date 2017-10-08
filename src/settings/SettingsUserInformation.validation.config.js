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

export const getConstraints = (props) => {
  const constraints = {
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
    account_opening_reason: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    tax_residence: {
      presence: () => {
        if (props.loginid.startsWith('MF')) {
          return {
            presence: true,
            message: 'This field is required.',
          };
        }
        return false;
      },
    },
    tax_identification_number: {
      presence: () => {
        if (props.loginid.startsWith('MF')) {
          return {
            presence: true,
            message: 'This field is required.',
          };
        }
        return false;
      },
      format: {
        /*eslint-disable */
        pattern: /^[\w-]{0,20}$/,
        /*eslint-enable */
        message: 'Only letters, numbers, space, and hyphen are allowed.',
      },
    },
  };
  return constraints;
};
