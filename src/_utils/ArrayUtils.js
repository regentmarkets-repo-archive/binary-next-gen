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

export const shallowMerge = (arr1, arr2) => {
    if (arr1.length === 0) {
        return arr2;
    }

    if (arr2.length === 0) {
        return arr1;
    }

    const maxLength = Math.max(arr1.length, arr2.length);
    const merged = [];
    for (let i = 0; i < maxLength; i ++) {
        const arr1Element = arr1[i];
        if (arr1Element && !merged.some(x => x === arr1Element)) {
            merged.push(arr1[i]);
        }

        const arr2Element = arr2[i];
        if (arr2Element && !merged.some(x => x === arr2Element)) {
            merged.push(arr2[i]);
        }
    }
    return merged;
};
