import safeMerge from './safeMerge';

export default (newBarrier, oldTrade) =>
    safeMerge(oldTrade, {
        barrier: newBarrier[0],
        barrier2: newBarrier[1],
    });
