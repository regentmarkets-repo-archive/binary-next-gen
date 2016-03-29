import { durationUnits } from '../_constants/TradeParams';
import { splitSecsToUnits } from './DateUtils';

export default (minInSecs, maxInSecs) => {
    // block is a structure that describe min and max of specific time unit
    const blockIsValid = (minArg, maxArg, unit) => {
        if (maxArg <= 1) {
            return false;
        }
        switch (unit) {
            case 's': return minArg < 60;
            case 'm': return minArg < 60;
            case 'h': return minArg < 24;
            case 'd': return true;
            default: throw new Error('Invalid time unit');
        }
    };
    const minInUnits = splitSecsToUnits(minInSecs);
    const maxInUnits = splitSecsToUnits(maxInSecs);

    const durations = [];
    for (let i = 0; i < minInUnits.length; i++) {
        const unit = durationUnits[i + 1];
        const minI = minInUnits[i];
        const maxI = maxInUnits[i];
        if (blockIsValid(minI, maxI, unit)) {
            durations.push({
                unit,
                min: minI > 0 ? minI : 1,
                max: maxI });
        }
    }
    return durations;
};
