import validate from 'validate.js/validate.min';
import { todayLocaleString, oneYearAfterStr } from 'binary-utils';
import moment from 'moment';

validate.extend(validate.validators.datetime, {
	parse: (v) => +moment.utc(v),
	format: (v) => moment.utc(v).format('YYYY-MM-DD'),
});

export const getConstraints = () => {
    const START_TIME_TXT = 'Start time is in the past.';
    const constraints = {
        trading_date: {
            date: {
                earliest: moment(todayLocaleString()),
                latest: moment(oneYearAfterStr()),
                tooEarly: START_TIME_TXT,
                notValid: START_TIME_TXT,
                tooLate: 'Start time cannot be more than 1 year.'
            },
        }
    };
    return constraints;
};
