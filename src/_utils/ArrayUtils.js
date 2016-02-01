export const groupByKey = (arr, key) => {
    const result = {};
    arr.forEach(ele => {
        const kv = ele[key];
        if (!result[kv]) {
            result[kv] = [];
        }
        result[kv].push(ele);
    });
    return result;
};

// simply remove keys
export const objectToArray = obj =>
    typeof obj.toArray !== 'undefined' ?
        obj.toArray() :
        Object.keys(obj).map(key => obj[key]);

export const arrayToObject = arr => {
    const obj = {};
    arr.forEach(ele => {
        Object.keys(ele)
            .forEach(k =>
                Array.isArray(obj[k]) ?
                    obj[k].push(ele[k]) :
                    obj[k] = [ele[k]]);
    });
    return obj;
};

export const arrayEqual = (a, b) => {
    if (a.length !== b.length) {
        return false;
    }

    return !(a.some((x, idx) => x !== b[idx]));
};
