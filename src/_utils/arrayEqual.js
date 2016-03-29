export const arrayEqual = (a, b) => {
    if (a.length !== b.length) {
        return false;
    }

    return !(a.some((x, idx) => x !== b[idx]));
};
