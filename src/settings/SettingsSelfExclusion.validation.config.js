import moment from 'moment';

/* eslint-disable consistent-return */

// Don't use where values are dates and functions
const clone = (obj) => JSON.parse(JSON.stringify(obj));

export const getConstraints = (formData) => {
  const numVerify = {
    numericality: {
      onlyInteger: true
    }
  };

  const account = JSON.parse(localStorage.getItem('account'));
  const currencyConfig = account ? account.currencies_config : {};
  const currency = account && Object.keys(account).length > 0 ? account.currency || account.default_currency : 'USD';
  const fractionalDigits = currencyConfig && Object.keys(currencyConfig).length ? currencyConfig[currency].fractional_digits : 2;
  const floatNumberRegex = `^\\d+(\\.\\d{0,${fractionalDigits}})?$`;
  const floatNumberError = `Please enter a number with up to ${fractionalDigits} decimal places.`;

  const floatNumberVerify = {
      format: {
        pattern: floatNumberRegex,
        message: floatNumberError
      }
  };

  const constraints = {
    max_balance: clone(floatNumberVerify),
    max_turnover: clone(floatNumberVerify),
    max_losses: clone(floatNumberVerify),
    max_7day_turnover: clone(floatNumberVerify),
    max_7day_losses: clone(floatNumberVerify),
    max_30day_turnover: clone(floatNumberVerify),
    max_30day_losses: clone(floatNumberVerify),
    max_open_bets: clone(numVerify),
    session_duration_limit: clone(numVerify),
    timeout_until_date: {
      condition: {
        message: 'Time out must be after today and cannot be more than 6 weeks.',
        func: (v) => !(moment(v).isAfter(moment().subtract(1, 'days'), 'day') && moment(v).isBefore(moment().add(6, 'weeks')))
      },
      presenceRequiredBy: 'timeout_until_time'
    },
    timeout_until_time: {
      presenceRequiredBy: 'timeout_until_date',
      condition: {
        message: 'Time out cannot be in the past.',
        func: (time, attr) => {
          const d = attr.timeout_until_date;
          if (time && d) {
            const timeout_until = moment(d + ' ' + time);
            return timeout_until.isBefore(moment());
          }
          return false;
        }
      }
    },
    exclude_until: {
      date: {
        earliest: moment(),
        tooEarly: 'Exclude time cannot be in the past.',
      },
      condition: {
        message: 'Exclude time cannot be less than 6 months and more than 5 years.',
        func: (v) => moment(v).isBefore(moment().add(6, 'months')) || moment(v).isAfter(moment().add(5, 'years')),
      }
    },
  };

  // set max limit constraints if max limit already exists
  Object.keys(formData).forEach((key) => {
    if (formData[key]
      && constraints[key]
      && constraints[key].numericality) {
      constraints[key].numericality = {
        onlyInteger: true,
        lessThanOrEqualTo: Number(formData[key]),
        notLessThanOrEqualTo: `Should be between 0 and ${formData[key]}.`
      };
      constraints[key].presence = true;
    } else if (formData[key]
      && constraints[key]
      && constraints[key].format) {
      constraints[key].numericality = {
        lessThanOrEqualTo: Number(formData[key]),
        notLessThanOrEqualTo: `Should be between 0 and ${formData[key]}.`
      };
      constraints[key].presence = true;
    }
  });

  return constraints;
};

