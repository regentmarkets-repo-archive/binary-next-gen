export const toPlainJS = obj =>
    obj && (typeof obj.toJS === 'undefined' ? obj : obj.toJS());

export default obj =>
    Object.keys(obj).reduce((acc, key) => {
        acc[key] = toPlainJS(obj[key]);
        return acc;
    }, {});
