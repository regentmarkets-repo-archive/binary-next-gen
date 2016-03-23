export const toPlainJS = obj =>
    obj && (typeof obj.toJS === 'undefined' ? obj : obj.toJS());

export const immutableChildrenToJS = obj =>
    Object.keys(obj).reduce((acc, key) => {
        acc[key] = toPlainJS(obj[key]);
        return acc;
    }, {});

/**
 * Find if certain value is true in the object
 * @param obj
 * @param predicate     (object, index) => true|false
 * @returns {boolean}
 */
export const findIfExist = (obj, predicate) => {
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

/**
 * shallow filter object's children by predicate,
 * @param obj
 * @param predicate       child => true|false
 * @return {object}
 */
export const filterObjectBy = (obj, predicate) => {
    const result = {};
    for (let k in obj) {
        if (obj.hasOwnProperty(k) && predicate(obj[k])) {
            result[k] = obj[k];
        }
    }
    return result;
};
