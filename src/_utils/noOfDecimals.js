export default number => {
    const numStr = number.toString();
    return numStr.includes('.') ?
        numStr.split('.')[1].length :
        0;
};
