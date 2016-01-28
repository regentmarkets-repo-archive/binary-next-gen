export const toPlainJS = obj =>
    obj && (typeof obj.toJS === 'undefined' ? obj : obj.toJS());

export const findIfExist = (obj, predicate) => {
    if (typeof obj !== 'object') {
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
