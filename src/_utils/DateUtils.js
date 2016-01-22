export const gmtToLocal = date =>
    new Date(date - date.getTimezoneOffset() * 60 * 1000);

export const localToGmt = date =>
    new Date(date + date.getTimezoneOffset() * 60 * 1000);

export const dateAsLocalISOString = date =>
    gmtToLocal(date).toISOString();

export const dateToDateString = date =>
    dateAsLocalISOString(date).slice(0, 10);

export const epochToDate = epoch =>
    new Date(epoch * 1000);

export const dateToEpoch = date =>
    date.getTime() / 1000;

export const epochToDateString = epoch =>
    dateToDateString(epochToDate(epoch));

export const dateToTimeString = date =>
    dateAsLocalISOString(date).slice(11, 19);

export const epochToTimeString = epoch =>
    dateToTimeString(new Date(epoch * 1000));

export const todayString = () =>
    dateToDateString(new Date());

export const nowAsEpoch = () =>
    Math.floor(Date.now() / 1000);

export const secondsToTimeString = secs => {
    const days = Math.floor(secs / 60 / 60 / 24);
    const hours = Math.floor(secs % (60 * 60 * 24) / (60 * 60));
    const minutes = Math.floor(secs % (60 * 60) / 60);
    const seconds = Math.floor(secs % 60);
    return (days > 0 ? `${days} day(s) ` : '')
        + (hours > 0 ? `${hours} hour(s)` : '')
        + (minutes > 0 ? `${minutes} minute(s)` : '')
        + (seconds > 0 ? `${seconds} second(s)` : '');
};

export const getLastXMonthEpoch = x => {
	const d = new Date();
	d.setMonth(d.getMonth() - x);
	return Math.floor(d.getTime() / 1000);
};

export const xDayEpoch = x => {
    const secsAway = (x - 1) * 60 * 60 * 24;
    return Math.floor(Date.now() / 1000) + secsAway;
};

export const todayEpoch = () => xDayEpoch(0);
export const yesterdayEpoch = () => xDayEpoch(-1);
export const last7DaysEpoch = () => xDayEpoch(-6);
export const last30DaysEpoch = () => xDayEpoch(-29);

// time string comparison
export const timeStringBigger = (a, b) => {
    const aH = +a.slice(0, 2);
    const aM = +a.slice(3, 5);
    const aS = +a.slice(6);

    const bH = +b.slice(0, 2);
    const bM = +b.slice(3, 5);
    const bS = +b.slice(6);

    if (aH !== bH) {
        return aH > bH;
    } else if (aM !== bM) {
        return aM > bM;
    }
    return aS > bS;
};

export const timeStringSmaller = (a, b) => {
    if (a === b) {
        return false;
    }
    return !timeStringBigger(a, b);
};
