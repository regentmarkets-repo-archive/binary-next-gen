const epochWithinRange = (epoch, range) => {
    const millis = epoch * 1000;
    const startMillis = range.open[0].getTime();
    const endMillis = (range.close[1] || range.close[0]).getTime();
    return (millis >= startMillis && millis <= endMillis);
};

export const forwardStartTimeValid = (dateStart, forwardStartingDuration) =>
    !!forwardStartingDuration.range.find(r => epochWithinRange(dateStart, r));

export const durationValid = (duration, durationUnit, options) =>
    !!options.find(opt => durationUnit === opt.unit && duration <= opt.max && duration >= opt.min);

export const categoryValid = (category, contract) =>
    !!contract[category];

export const allTimeRelatedFieldValid = (dateStart, duration, durationUnit, contractPerType) => {
    if (!contractPerType.durations) {       // only forward starting
        if (!dateStart) {
            return false;
        }
        const forwardStartingDuration = contractPerType.forwardStartingDuration;
        const dateStartValid = forwardStartTimeValid(dateStart, forwardStartingDuration);
        const durationIsValid = durationValid(duration, durationUnit, forwardStartingDuration.options);
        return dateStartValid && durationIsValid;
    }
    return durationValid(duration, durationUnit, contractPerType.durations);
};
