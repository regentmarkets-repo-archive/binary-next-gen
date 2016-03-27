/**
 * shallow filter object's children by predicate,
 * @param obj
 * @param predicate       child => true|false
 * @return {object}
 */
export default (obj, predicate) => {
    const result = {};
    for (let key in obj) {
        if (obj[key] && predicate(obj[key])) {
            result[key] = obj[key];
        }
    }
    return result;
};
