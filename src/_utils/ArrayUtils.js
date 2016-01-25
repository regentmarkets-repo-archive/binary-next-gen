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

export const objectToArray = obj =>
    typeof obj.toArray !== 'undefined' ?
        obj.toArray() :
        Object.keys(obj).map(key => obj[key]);
