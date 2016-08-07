import safeMerge from './safeMerge';
import createDefaultBarriers from '../defaults/createDefaultBarriers';
import createDefaultBarrierType from '../defaults/createDefaultBarrierType';
import areAllTimeFieldsValid from '../validation/areAllTimeFieldsValid';

export default (unit, contract, oldTrade) => {
    const { tradeCategory, type, dateStart, duration } = oldTrade;
    const contractPerType = contract[tradeCategory][type];

    let newUnit = unit;

    // TODO: consider factor this out
    if (['t', 's', 'm', 'h', 'd'].indexOf(newUnit) < 0) {
        newUnit = 't';
    }

    let newDuration = duration;
    if (!areAllTimeFieldsValid(dateStart, newDuration, newUnit, contractPerType)) {
        // only start later
        const durationsObj = contractPerType.durations;
        const forwardStartingDurationObj = contractPerType.forwardStartingDuration;
        const allowStartLaterOnly = !durationsObj && forwardStartingDurationObj;
        const optionToUse = allowStartLaterOnly ?
            forwardStartingDurationObj.options.find(d => d.unit === newUnit) :
            durationsObj.find(d => d.unit === newUnit);

        newDuration = optionToUse.min;
    }

    // if it's forward starting type, do not update barrier as not applicable
    if (dateStart) {
        return safeMerge(oldTrade, { durationUnit: newUnit, duration: newDuration });
    }

    const newBarriers = createDefaultBarriers({
        contracts: contract,
        category: tradeCategory,
        type,
        duration: newDuration,
        durationUnit: newUnit,
    });

    const newBarrierType = createDefaultBarrierType(newDuration, newUnit, tradeCategory);

    return safeMerge(oldTrade, {
        duration: newDuration,
        durationUnit: newUnit,
        barrier: newBarriers[0],
        barrier2: newBarriers[1],
        barrierType: newBarrierType,
    });
};
