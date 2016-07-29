import { nowAsEpoch } from 'binary-utils';

export const forwardStartTimeValid = dateStart =>
    (dateStart - nowAsEpoch()) > (5 * 60);    // arbritarily chosen buffer


export const durationValid = (duration, durationUnit, options) =>
    !!options.find(opt => durationUnit === opt.unit && duration <= opt.max && duration >= opt.min);

export const categoryValid = (category, contract) =>
    !!contract[category];

export const allTimeRelatedFieldValid = (dateStart, duration, durationUnit, contractPerType) => {
    const forwardStartingDuration = contractPerType.forwardStartingDuration;
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
    return durationValid(duration, durationUnit, contractPerType.durations);
};
