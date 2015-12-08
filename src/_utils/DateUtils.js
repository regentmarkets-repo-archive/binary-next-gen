export const dateToDateString = date =>
    date.toISOString().slice(0, 10);

export const epochToDateString = epoch =>
    dateToDateString(epoch * 1000);

export const todayString = () =>
    dateToDateString(new Date());
