export const getConstraints = (props) => {
  const constraints = {
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
    account_opening_reason: {
      presence: true,
    },
    tax_residence: {
      presence: () => {
        if (/MF/i.test(props.loginid)) {
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
        if (/MF/i.test(props.loginid)) {
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
