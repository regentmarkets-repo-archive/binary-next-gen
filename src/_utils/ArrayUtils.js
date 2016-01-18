export const objectToArray = obj =>
    typeof obj.toArray !== 'undefined' ?
        obj.toArray() :
        Object.keys(obj).map(key => obj[key]);
