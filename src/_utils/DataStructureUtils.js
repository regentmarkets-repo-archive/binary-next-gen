export const twoWayMap = map => {
    const twoWayMap = map;
    Object.keys(map).forEach(k => {
        const v = twoWayMap[k];
        twoWayMap[v] = k;
    });
    return twoWayMap;
};
