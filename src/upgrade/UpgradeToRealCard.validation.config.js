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
      presence: true,
    },
    account_opening_reason: {
      presence: true,
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
      presence: true,
      format: {
        /*eslint-disable */
        pattern: /^\+?[0-9\s]*$/,
        /*eslint-enable */
        message: 'Only numbers and spaces are allowed.',
      },
    },
    secret_question: {
      presence: true,
    },
    secret_answer: {
      presence: true,
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
