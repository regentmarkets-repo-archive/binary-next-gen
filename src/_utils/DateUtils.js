/* **********************
 * Time zone conversion
 ***********************/
export const gmtToLocal = date =>
    new Date(date - date.getTimezoneOffset() * 60 * 1000);

export const localToGmt = date =>
    new Date(date + date.getTimezoneOffset() * 60 * 1000);

/* ***************************
 * Date to ... conversion
 *****************************/
export const dateAsLocalISOString = date =>
    gmtToLocal(date).toISOString();

export const dateToDateString = date =>
    dateAsLocalISOString(date).slice(0, 10);

export const dateToTimeString = date =>
    dateAsLocalISOString(date).slice(11, 19);

export const dateToUTCTimeString = date =>
    date.toISOString().slice(11, 19);

export const dateToGMTString = date =>
    date.toISOString().replace(/T/, ' ').replace(/\..+/, '');

/* ****************************
 * Epoch to ....
 *****************************/
export const epochToDate = epoch =>
    new Date(epoch * 1000);

export const dateToEpoch = date =>
    Math.floor(date.getTime() / 1000);

export const epochToDateString = epoch =>
    epoch && dateToDateString(epochToDate(epoch));

export const epochToUTCDateString = epoch =>
    epoch && epochToDate(epoch).toISOString().slice(0, 10);

export const epochToDateTimeString = epoch =>
    epochToDate(epoch).toUTCString();

export const epochToTimeString = epoch =>
    dateToTimeString(new Date(epoch * 1000));

export const epochToUTCTimeString = epoch => {
    const d = new Date(epoch * 1000);
    return d.toISOString().slice(11, 19);
};


// only supported format = "09:20", seconds are not supported
export const timeStringToSeconds = timeString => {
    const h = +timeString.slice(0, 2);
    const m = +timeString.slice(3, 5);

    return (h * 3600) + (m * 60);
};

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
    const secsAway = x * 60 * 60 * 24;
    return Math.floor(Date.now() / 1000) + secsAway;
};

export const todayEpoch = () => xDayEpoch(0);
export const yesterdayEpoch = () => xDayEpoch(-1);
export const last7DaysEpoch = () => xDayEpoch(-6);
export const last30DaysEpoch = () => xDayEpoch(-29);


export const todayLocaleString = () =>
    dateToDateString(new Date());

export const todayUTCString = () =>
    (new Date()).toISOString().slice(0, 10);

export const yesterdayString = () =>
    dateToDateString(new Date(yesterdayEpoch() * 1000));

export const yesterdayUTCString = () =>
    (new Date(yesterdayEpoch() * 1000)).toISOString().slice(0, 10);

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

export const timeStringIsBetween = (start, end, target) => {
    if (timeStringBigger(end, start)) {
        return timeStringBigger(target, start) && timeStringSmaller(target, end);
    }
    /**
     * if open time is bigger than close time
     * target should not between close and open time
     * eg. '09:00:00' is not between '23:00:00' (start) and '08:00:00'(close)
     * because it is between '08:00:00' to '23:00:00'
     * */

    return !(timeStringBigger(target, end) && timeStringSmaller(target, start));
};

export const oneYearAfterStr = () =>
	new Date().setFullYear(new Date().getFullYear() + 1);

export const splitSecsToUnits = sec => {
    const minute = Math.floor(sec / 60);
    const hour = Math.floor(minute / 60);
    const day = Math.floor(hour / 24);

    return [sec, minute, hour, day];
};

export const nextXDay = (x) => {
    const tmr = new Date();
    tmr.setDate(tmr.getDate() + x);
    return tmr;
};

