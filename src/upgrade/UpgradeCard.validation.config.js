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
    firstName: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
      validateGeneral: true,
    },
    lastName: {
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
    addressLine1: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
      validateAddress: true,
    },
    addressLine2: {
      validateAddress: true,
    },
    addressCity: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
      validateGeneral: true,
    },
    addressState: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    addressPostcode: {
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
    forexTradingExperience: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    forexTradingFrequency: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    indicesTradingExperience: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    indicesTradingFrequency: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    commoditiesTradingExperience: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    commoditiesTradingFrequency: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    stocksTradingExperience: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    stocksTradingFrequency: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    otherDerivativesTradingExperience: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    otherDerivativesTradingFrequency: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    otherInstrumentsTradingExperience: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    otherInstrumentsTradingFrequency: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    employmentIndustry: {
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
    educationLevel: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    incomeSource: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    netIncome: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    estimatedWorth: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    acceptRisk: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    taxResidence: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    taxIdentificationNumber: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    accountTurnover: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
    accountOpeningReason: {
      presence: {
        presence: true,
        message: 'This field is required.',
      },
    },
  };
  return constraints;
};
