/**
 * This function change the input
 * @param obj           plain js object
 * @returns {object}    object without null value
 */
export const removeNullValueKey = obj => {
    const keys = Object.keys(obj);
    keys.forEach(k => {
        const child = obj[k];
        if (child === null) {
            delete obj[k];
            return;
        }

        if (typeof child === 'object') {
            removeNullValueKey(child);
        }
    });

    return obj;
};

const nullRemoverMiddleware = () => next => action => {
    const actionsKey = Object.keys(action);
    actionsKey.forEach(k => {
        if (action[k] === null) {
            delete action[k];
        } else if (typeof action[k] === 'object') {
            removeNullValueKey(action[k]);
        }
    });

    return next(action);
};

export default nullRemoverMiddleware;
