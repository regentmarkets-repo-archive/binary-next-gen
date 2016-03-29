/**
 * check is duration is within range
 * @param {number} duration
 * @param {char} durationUnit - one of ['s', 'h', 'm', 'd']
 * @param {array} range - array of object, eg. [{ unit: 't', min: 5, max: 10}, ...]
 * @returns {boolean}
 */
export default (duration, durationUnit, range) => {
    const relatedBlock = range.find(r => r.unit === durationUnit);
    if (!relatedBlock) {
        return false;
    }

    return duration <= relatedBlock.max && duration >= relatedBlock.min;
};
