export default arr => {
    const obj = {};
    arr.forEach(ele => {
        Object.keys(ele)
            .forEach(k =>
                Array.isArray(obj[k]) ?
                    obj[k].push(ele[k]) :
                    obj[k] = [ele[k]]);
    });
    return obj;
};
