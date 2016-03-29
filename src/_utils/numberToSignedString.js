export default n => {
    if (n >= 0) {
        return '+' + n;
    }
    return n.toString();
};
