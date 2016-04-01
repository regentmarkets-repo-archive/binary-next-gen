// eg.
// 3 -> 0.001
// 2 -> 0.01
// 1 -> 0.1
export default pipSize => {
    const zeros = Array(pipSize).join('0');
    const stepStr = '0.' + zeros + 1;
    return stepStr;
};
