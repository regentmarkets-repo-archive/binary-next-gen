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

  const constraints = {
    max_balance: clone(numVerify),
    max_turnover: clone(numVerify),
    max_losses: clone(numVerify),
    max_7day_turnover: clone(numVerify),
    max_7day_losses: clone(numVerify),
    max_30day_turnover: clone(numVerify),
    max_30day_losses: clone(numVerify),
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
    }
  });

  return constraints;
};

