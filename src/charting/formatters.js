import { epochToTimeString } from '../_utils/DateUtils';

export const currencyFormatter = value =>
     new Intl.NumberFormat(undefined, { minimumFractionDigits: 2 }).format(value);

export const currencyFormatterValue = x =>
    new Intl.NumberFormat(undefined, { minimumFractionDigits: 2 }).format(x.value);


export const timeFormatter = value => epochToTimeString(value);

export const dualFormatter = params =>
    params[0] && timeFormatter(params[0].name) + '<br />' + currencyFormatter(params[0].value);
