import isDurationValid from './isDurationValid';
import isForwardStartTimeValid from './isForwardStartTimeValid';

export default (dateStart, duration, durationUnit, contractPerType, isOpen = true) => {
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
        const dateStartValid = isForwardStartTimeValid(dateStart);
        const durationIsValid = isDurationValid(duration, durationUnit, forwardStartingDuration.options);
        return dateStartValid && durationIsValid;
    }

    if (!dateStart) {
        return isDurationValid(duration, durationUnit, contractPerType.durations);
    }

    return isDurationValid(duration, durationUnit, forwardStartingDuration.options);
};
