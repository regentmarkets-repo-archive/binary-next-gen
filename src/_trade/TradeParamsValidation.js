import { nowAsEpoch } from 'binary-utils';

export const forwardStartTimeValid = dateStart =>
    (dateStart - nowAsEpoch()) > (5 * 60);    // arbritarily chosen buffer

export const durationValid = (duration, durationUnit, options) =>
    !!options.find(opt => durationUnit === opt.unit && duration <= opt.max && duration >= opt.min);

export const categoryValid = (category, contract) =>
    !!contract[category];

export const allTimeRelatedFieldValid = (dateStart, duration, durationUnit, contractPerType, isOpen = true) => {
    const forwardStartingDuration = contractPerType.forwardStartingDuration;
    if (!dateStart && !isOpen) {
        return false;
    }

    if (dateStart && !forwardStartingDuration) {
        return false;
    }

    if (!contractPerType.durations) {       // only forward starting
        if (!dateStart) {
            return false;
        }
        const dateStartValid = forwardStartTimeValid(dateStart);
        const durationIsValid = durationValid(duration, durationUnit, forwardStartingDuration.options);
        return dateStartValid && durationIsValid;
    }

    if (!dateStart) {
        return durationValid(duration, durationUnit, contractPerType.durations);
    }
    return durationValid(duration, durationUnit, forwardStartingDuration.options);
};

export function barrierTooLong(barriers, pipSize) {
    for (let i = 0; i < barriers.length; i++) {
        const barrier = barriers[i];
        if (barrier) {
            const barrierDecimals = barrier.toString().split('.')[1];
            const barrierExceedPipSize = barrierDecimals && (barrierDecimals.length > pipSize);
            return barrierExceedPipSize;
        }
    }
    return false;
}

export const noOfBarrierCorrect = (barrier, expiryType, contractPerType) => {
    const barrierOptions = contractPerType.barriers[expiryType];
    if (!barrierOptions) return false;

    let b1 = true;
    let b2 = true;
    if (barrierOptions[0]) {
        b1 = barrier[0];
    }

    if (barrierOptions[1]) {
        b2 = barrier[1];
    }

    return b1 && b2;
};
