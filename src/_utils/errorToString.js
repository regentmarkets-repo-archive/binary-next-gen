export default (text) => {
    const strText = text.split(')').length > 1 ? text.split(')')[1] : text;
    return strText;
};
