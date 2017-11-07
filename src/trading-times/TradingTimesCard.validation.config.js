import { todayLocaleString, oneYearAfterStr } from 'binary-utils';
import moment from 'moment';

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
