import { getConstraints as getUpgradeRealConstraints } from './UpgradeToRealCard.validation.config';

export const getConstraints = (props) => {
  const constraints = {
    ...getUpgradeRealConstraints(),
    forex_trading_experience: {
      presence: true,
    },
    forex_trading_frequency: {
      presence: true,
    },
    indices_trading_experience: {
      presence: true,
    },
    indices_trading_frequency: {
      presence: true,
    },
    commodities_trading_experience: {
      presence: true,
    },
    commodities_trading_frequency: {
      presence: true,
    },
    stocks_trading_experience: {
      presence: true,
    },
    stocks_trading_frequency: {
      presence: true,
    },
    other_derivatives_trading_experience: {
      presence: true,
    },
    other_derivatives_trading_frequency: {
      presence: true,
    },
    other_instruments_trading_experience: {
      presence: true,
    },
    other_instruments_trading_frequency: {
      presence: true,
    },
    employment_industry: {
      presence: true,
    },
    occupation: {
      presence: true,
    },
    education_level: {
      presence: true,
    },
    income_source: {
      presence: true,
    },
    net_income: {
      presence: true,
    },
    estimated_worth: {
      presence: true,
    },
    tax_residence: {
      presence: true,
    },
    tax_identification_number: {
      presence: true,
      format: {
        pattern: /^[\w-]{0,20}$/,
        message: 'Only letters, numbers, space, and hyphen are allowed.',
      },
    },
    account_turnover: {
      presence: true,
    },
    source_of_wealth: {
      presence: true,
    }
  };

  if (!props.loginid.startsWith('VRTC')) {
    constraints.secret_question.presence = false;
    constraints.secret_answer.presence = false;
    constraints.secret_answer.format = false;
  }

  return constraints;
};
