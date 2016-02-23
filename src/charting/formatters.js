import { epochToTimeString, epochToDate } from '../_utils/DateUtils';

export const currencyFormatter = value =>
     new Intl.NumberFormat(undefined, { minimumFractionDigits: 2 }).format(value);

export const currencyFormatterValue = x =>
    new Intl.NumberFormat(undefined, { minimumFractionDigits: 2 }).format(x.value);


export const timeFormatter = value => epochToTimeString(value);

export const dateTimeFormatter = value => epochToDate(value).toLocaleString();

export const dualFormatter = params =>
    'Date: ' + dateTimeFormatter(Math.floor(params[0].data[0]))
    + '<br />'
    + 'Spot: ' + currencyFormatter(params[0].data[1]);

