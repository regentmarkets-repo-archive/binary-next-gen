import { dateToEpoch } from 'binary-utils';

export default forwardStartingDuration => {
    const nextDayOpening = dateToEpoch(forwardStartingDuration.range[1].open[0]);
    return nextDayOpening + (60 * 15);                      // 15 minutes * 60 secs
};
