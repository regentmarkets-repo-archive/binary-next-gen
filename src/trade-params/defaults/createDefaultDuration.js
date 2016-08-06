import createDefaultStartLaterEpoch from './createDefaultStartLaterEpoch';

export default (contracts, category, type, isOpen = true) => {
    if (category === 'spreads') {
        return undefined;
    }
    const d = contracts[category][type].durations;

    if (!!d && isOpen) {
        return {
            duration: d[0].min,
            durationUnit: d[0].unit,
        };
    }
    const forwardD = contracts[category][type].forwardStartingDuration;

    return {
        dateStart: createDefaultStartLaterEpoch(forwardD),
        duration: forwardD.options[0].min,
        durationUnit: forwardD.options[0].unit,
    };
};
