import moment from 'moment';

export const LOCALIZED_MONTHS = moment.localeData()._months;

export function timeStr(date) {
    return moment.unix(date).format('hh:mm:ss');
}

export function dateStr(date) {
    return moment.unix(date).format('YYYY-MM-DD');
}

export function dateTimeStr(date) {
    return moment.unix(date).format('YYYY-MM-DD hh:mm:ss');
}
