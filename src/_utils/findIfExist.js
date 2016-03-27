/**
 * Find if certain value is true in the object
 * @param obj
 * @param predicate     (object, index) => true|false
 * @returns {boolean}
 */
const findIfExist = (obj, predicate) => {
    if (typeof obj !== 'object' || obj === null || obj === undefined) {
        return false;
    }

    const allChildren = Object.keys(obj).map(k => obj[k]);
    const childrenMeetPredicate = allChildren.map((child, k) => predicate(child, k));
    if (childrenMeetPredicate.indexOf(true) > -1) {
        return true;
    }
    const childrenResult = allChildren.map(child => findIfExist(child, predicate));
    return childrenResult.indexOf(true) > -1;
};

export default findIfExist;
