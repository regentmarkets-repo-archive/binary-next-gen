import moment from 'moment';

export const LOCALIZED_MONTHS = moment.localeData()._months;

export function shortDateStr(date) {
    return moment.unix(date).format('h:mm:ss\u00a0a');
}

export function fullDateStr(date) {
    return moment.unix(date).format('YYYY-MM-DD h:mm:ss\u00a0a');
}
