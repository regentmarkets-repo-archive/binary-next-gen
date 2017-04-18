import { isDurationWithinRange } from 'binary-utils';
import safeMerge from './safeMerge';
import createDefaultDuration from '../defaults/createDefaultDuration';
import createDefaultBarriers from '../defaults/createDefaultBarriers';

export default (newStartDate, contract, oldTrade) => {
    const { duration, durationUnit, tradeCategory, type } = oldTrade;
    const startLaterObj = contract[tradeCategory][type].forwardStartingDuration;

    // ignore if start later not allowed
    if (!startLaterObj) return oldTrade;

    if (!newStartDate) {
        const newDuration = createDefaultDuration(
            contract,
            tradeCategory,
            type,
        );
        const newBarrier = createDefaultBarriers({
            contracts: contract,
            category: tradeCategory,
            type,
            duration: newDuration.duration,
            durationUnit: newDuration.durationUnit,
        });

        return safeMerge(oldTrade, {
            dateStart: newStartDate,
            duration: newDuration.duration,
            durationUnit: newDuration.durationUnit,
            barrier: newBarrier[0],
            barrier2: newBarrier[1],
        });
    }

    // do not reset duration unless the old one is not valid
    const startLaterOptions = startLaterObj.options;
    if (isDurationWithinRange(duration, durationUnit, startLaterOptions)) {
        return safeMerge(oldTrade, { dateStart: newStartDate });
    }

    return safeMerge(oldTrade, {
        dateStart: newStartDate,
        duration: startLaterOptions[0].min,
        durationUnit: startLaterOptions[0].unit,
        barrier: undefined,
        barrier2: undefined,
    });
};
