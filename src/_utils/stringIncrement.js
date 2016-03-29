export default str => {
    const toNumber = +str;
    if (toNumber === 0) {
        return (1).toString();
    }
    if (!!toNumber) {
        return (toNumber + 1).toString();
    }
    const captureTrailingNumber = /(\D+)(\d*)$/g;
    const match = captureTrailingNumber.exec(str);
    const incremented = match[2] ? `${match[1]}${+match[2] + 1}` : match[1] + '0';
    return incremented;
};
