import { durationUnits } from '../_constants/TradeParams';
import { groupByKey } from '../_utils/ArrayUtils';
import { durationToSecs, splitSecsToUnits } from '../_utils/DateUtils';

export const isDurationWithinRange = (duration, durationUnit, range) => {
    const relatedBlock = range.find(r => r.unit === durationUnit);
    if (!relatedBlock) {
        return false;
    }

    return duration <= relatedBlock.max && duration >= relatedBlock.min;
};

export const durationSecHelper = duration => {
    const d = +duration.slice(0, -1);
    const u = duration.slice(-1);
    return durationToSecs(d, u);
};

export const extractMinMaxInUnits = (min, max) => {
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
    const minInUnits = splitSecsToUnits(min);
    const maxInUnits = splitSecsToUnits(max);
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

export const extractDurationHelper = (contracts, type) => {
    if (type.indexOf('SPREAD') > -1) {
        return [];
    }

    const tickContracts = contracts.filter(c => c.min_contract_duration.slice(-1) === 't');
    const tickDuration = tickContracts.length > 0 ? { min: 5, max: 10, unit: 't' } : undefined;

    const nonTickContracts = contracts.filter(c => c.min_contract_duration.slice(-1) !== 't');
    if (nonTickContracts.length === 0) {
        return [tickDuration];
    }
    const nonTickMinSec = nonTickContracts
        .map(c => durationSecHelper(c.min_contract_duration))
        .reduce((a, b) => Math.min(a, b));

    const nonTickMaxSec = nonTickContracts
        .map(c => durationSecHelper(c.max_contract_duration))
        .reduce((a, b) => Math.max(a, b));

    const nonTicksDuration = extractMinMaxInUnits(nonTickMinSec, nonTickMaxSec);
    if (tickDuration) {
        nonTicksDuration.unshift(tickDuration);
    }

    return nonTicksDuration;
};

export const extractForwardStartingDuration = (contracts, type) => {
    const forwardStartingContracts = contracts.filter(c => !!c.forward_starting_options);
    if (forwardStartingContracts.length === 0) {
        return undefined;
    }

    if (forwardStartingContracts.length > 1) {
        throw new Error('Assumption broken, more than one contract with forward starting options');
    }

    const forwardOptions = forwardStartingContracts[0].forward_starting_options;
    const groupByDate = groupByKey(forwardOptions, 'date');
    const forwardStartingRange = [];
    Object.keys(groupByDate)
        .sort((a, b) => +a > +b)
        .forEach(date => {
            const timesPerDateArr = groupByDate[date].map(obj => {
                const open = new Date(obj.open * 1000);
                const close = new Date(obj.close * 1000);
                return { open, close };
            });
            const timesPerDateObj = arrayToObject(timesPerDateArr);
            forwardStartingRange.push({ date: new Date(date * 1000), ...timesPerDateObj });
        });

    const forwardStartingDurations = extractDurationHelper(forwardStartingContracts, type);
    return {
        range: forwardStartingRange,
        options: forwardStartingDurations,
    };
};

export const extractDuration = (contracts, type) => {
    // const forwardStartingDuration = contracts.filter(c => !!c.forward_starting_options);
    const nonForwardStartingContracts = contracts.filter(c => !c.forward_starting_options);

    return extractDurationHelper(nonForwardStartingContracts, type);
};
