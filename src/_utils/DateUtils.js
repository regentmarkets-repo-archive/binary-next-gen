export const dateToDateString = date =>
    date.toISOString().slice(0, 10);

export const epochToDateString = epoch =>
    dateToDateString(new Date(epoch * 1000));

export const dateToTimeString = date =>
    date.toISOString().slice(11, 19);

export const epochToTimeString = epoch =>
    dateToTimeString(new Date(epoch * 1000));

export const todayString = () =>
    dateToDateString(new Date());
