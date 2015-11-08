import moment from 'moment';

export const LOCALIZED_MONTHS = moment.localeData()._months;

export const timeStr = date => moment.unix(date).format('hh:mm:ss');

export const dateStr = date => moment.unix(date).format('YYYY-MM-DD');

export const dateTimeStr = date => moment.unix(date).format('YYYY-MM-DD hh:mm:ss');

export const dateToInput = date => dateStr(date.getTime() / 1000);

export const tomorrowStr = () => moment().add(1, 'days').format('YYYY-MM-DD');

export const todayStr = () => moment().format('YYYY-MM-DD');

export const oneYearAgoStr = () => moment().add(-1, 'years').format('YYYY-MM-DD');
