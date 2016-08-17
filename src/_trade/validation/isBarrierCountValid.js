export default (barrier, expiryType, contractPerType) => {
    const barrierOptions = contractPerType.barriers[expiryType];
    if (!barrierOptions) return false;

    let barrier1Valid = true;
    let barrier2Valid = true;

    if (barrierOptions[0]) {
        barrier1Valid = barrier[0] || barrier[0] === 0;
    }

    if (barrierOptions[1]) {
        barrier2Valid = barrier[1] || barrier[1] === 1;
    }

    return barrier1Valid && barrier2Valid;
};
