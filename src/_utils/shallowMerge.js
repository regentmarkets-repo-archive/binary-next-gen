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
