import arrayToObject from './arrayToObject';
import groupByKey from './groupByKey';
import extractDurationHelper from './extractDurationHelper';

export default (contracts, type) => {
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
