// Prioritize rise/fall
export default contracts => {
    const allCategory = Object.keys(contracts);
    if (allCategory.includes('risefall')) {
        return 'risefall';
    }
    return allCategory[0];
};
