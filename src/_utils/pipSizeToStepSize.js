// example:
// input        output
// 3        ->  0.001
// 2        ->  0.01
// 1        ->  0.1
export default pipSize => {
    if (isNaN(pipSize)) {
        return '0.01';
    }
    const zeros = Array(pipSize).join('0');
    const stepStr = '0.' + zeros + 1;
    return stepStr;
};
