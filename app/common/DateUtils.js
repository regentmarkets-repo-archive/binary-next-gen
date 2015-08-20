import moment from 'moment';

export const LOCALIZED_MONTHS = moment.localeData()._months;

export function shortDateStr(date) {
    return moment.unix(date).format('h:mm:ss a');
}
