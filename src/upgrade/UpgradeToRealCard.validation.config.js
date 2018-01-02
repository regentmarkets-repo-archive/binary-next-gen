import moment from 'moment';

export const getConstraints = () => {
  const constraints = {
    salutation: {
      presence: true,
    },
    first_name: {
      presence: true,
      validateGeneral: true,
    },
    last_name: {
      presence: true,
      validateGeneral: true,
    },
    residence: {
      presence: true,
    },
    address_line_1: {
      presence: true,
      validateAddress: true,
    },
    address_line_2: {
      validateAddress: true,
    },
    address_city: {
      presence: true,
      validateGeneral: true,
    },
    address_state: {
      presence: true,
    },
    place_of_birth: {
      presence: true,
    },
    date_of_birth: {
      date: {
        earliest: moment('1800-01-02'),
        latest: moment().subtract(17, 'years')
      },
      presence: { allowEmpty: false },
    },
    account_opening_reason: {
      presence: true,
    },
    address_postcode: {
      format: {
        pattern: /^([a-zA-Z\d-\s])*$/,
        message: 'Only letters, numbers, space, and hyphen are allowed.',
      },
    },
    phone: {
      presence: true,
      format: {
        pattern: /^\+?[0-9\s]*$/,
        message: 'Only numbers and spaces are allowed.',
      },
    },
    secret_question: {
      presence: true,
    },
    secret_answer: {
      presence: true,
      format: {
        pattern: /^[\w\-\,\.\' ]+/, // eslint-disable-line
        message: 'Only letters, numbers, space, hyphen, period, and apostrophe are allowed.',
      }
    },
    PEPDeclaration: {
      presence: {
        message: 'Please confirm that you are not a politically exposed person.'
      }
    },
    accept_risk: {
      presence: {
        message: 'Please accept the terms and conditions.'
      }
    }
  };
  return constraints;
};
