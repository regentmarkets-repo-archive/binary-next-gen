import { epochToUTCTimeString, timeStringIsBetween } from '../_utils/DateUtils';

export default (assets, times, now) => {
    const nowInTimeString = epochToUTCTimeString(now);
    const availabilities = {};

    times.forEach(s => {
        if (!s.times) {
            return;
        }
        const open = s.times.open;
        const close = s.times.close;

        // Assuming closing time is larger than open time
        if (s.name.indexOf('Random') > -1) {
            availabilities[s.symbol] = true;
        } else if (open.length === 1) {
            if (timeStringIsBetween(open[0], close[0], nowInTimeString)) {
                availabilities[s.symbol] = true;
            }
        } else if (open.length === 2) {
            if (timeStringIsBetween(open[0], close[0], nowInTimeString) ||
                timeStringIsBetween(open[1], close[1], nowInTimeString)) {
                availabilities[s.symbol] = true;
            }
        }
    });
    const availableAssets = assets.filter(s => availabilities[s.value]);

    return availableAssets;
};
