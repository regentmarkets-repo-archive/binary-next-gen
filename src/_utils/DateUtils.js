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

export const nowAsEpoch = () => Math.floor(Date.now() / 1000);

export const secondsToTimeString = secs => {
    const days = Math.floor(secs / 86400);
    const hours = Math.floor(secs % 86400 / 3600);
    const minutes = Math.floor(secs % 3600 / 60);
    const seconds = Math.floor(secs % 60);
    return (days > 0 ? `${days} day(s) ` : '')
        + (hours > 0 ? `${hours} hour(s)` : '')
        + (minutes > 0 ? `${minutes} minute(s)` : '')
        + (seconds > 0 ? `${seconds} second(s)` : '');
};
