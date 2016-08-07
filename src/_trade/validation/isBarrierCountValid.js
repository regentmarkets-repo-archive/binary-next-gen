export default (barrier, expiryType, contractPerType) => {
    const barrierOptions = contractPerType.barriers[expiryType];
    if (!barrierOptions) return false;

    let b1 = true;
    let b2 = true;
    if (barrierOptions[0]) {
        b1 = barrier[0];
    }

    if (barrierOptions[1]) {
        b2 = barrier[1];
    }

    return b1 && b2;
};
