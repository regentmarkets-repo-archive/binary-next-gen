import createDefaultCategory from './createDefaultCategory';
import createDefaultType from './createDefaultType';
import createDefaultDuration from './createDefaultDuration';
import createDefaultBarriers from './createDefaultBarriers';
import createDefaultBarrierType from './createDefaultBarrierType';
import createDefaultStartLaterEpoch from './createDefaultStartLaterEpoch';

export default (contracts, symbol, isOpen) => {
    const category = createDefaultCategory(contracts);
    const type = createDefaultType(contracts, category);
    const { duration, durationUnit } = createDefaultDuration(contracts, category, type, isOpen);
    const barriers = createDefaultBarriers({ contracts, category, type, duration, durationUnit });
    const barrierType = createDefaultBarrierType(duration, durationUnit, category);

    const startLaterOpts = contracts[category][type].forwardStartingDuration;
    const dateStart = isOpen ? undefined : startLaterOpts && createDefaultStartLaterEpoch(startLaterOpts);
    return {
        symbol,
        tradeCategory: category,
        duration,
        durationUnit,
        dateStart,
        basis: 'stake',
        amount: 50,
        type,
        barrierType,
        barrier: barriers[0],
        barrier2: barriers[1],
    };
};
