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

export function dateToInput(date) {
    return dateStr(date.getTime() / 1000);
}

export function tomorrowStr() {
    return moment().add(1, 'days').format('YYYY-MM-DD');
}

export function todayStr() {
    return moment().format('YYYY-MM-DD');
}

export function oneYearAgoStr() {
    return moment().add(-1, 'years').format('YYYY-MM-DD');
}
