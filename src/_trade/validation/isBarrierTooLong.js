export default (barriers, pipSize) => {
    for (let i = 0; i < barriers.length; i++) {
        const barrier = barriers[i];
        if (barrier) {
            const barrierDecimals = barrier.toString().split('.')[1];
            const barrierExceedPipSize =
                barrierDecimals && barrierDecimals.length > pipSize;
            return barrierExceedPipSize;
        }
    }
    return false;
};
