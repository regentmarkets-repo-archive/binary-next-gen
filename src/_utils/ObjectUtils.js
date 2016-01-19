export const findIfExist = (obj, predicate) => {
    if (typeof obj !== 'object') {
        return false;
    }

    const allChildren = Object.keys(obj).map(k => obj[k]);
    const childrenMeetPredicate = allChildren.map(child => predicate(child));
    if (childrenMeetPredicate.indexOf(true) > -1) {
        return true;
    }
    console.log(allChildren);
    const childrenResult = allChildren.map(child => findIfExist(child, predicate));
    return childrenResult.indexOf(true) > -1;
};
