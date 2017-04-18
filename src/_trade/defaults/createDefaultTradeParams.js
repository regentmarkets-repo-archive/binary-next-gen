import createDefaultCategory from './createDefaultCategory';
import createDefaultType from './createDefaultType';
import createDefaultDuration from './createDefaultDuration';
import createDefaultBarriers from './createDefaultBarriers';
import createDefaultBarrierType from './createDefaultBarrierType';

export default (contracts, symbol, isOpen) => {
    const category = createDefaultCategory(contracts);
    const type = createDefaultType(contracts, category);
    const { duration, durationUnit, dateStart } = createDefaultDuration(
        contracts,
        category,
        type,
        isOpen,
    );
    const barriers = createDefaultBarriers({
        contracts,
        category,
        type,
        duration,
        durationUnit,
    });
    const barrierType = createDefaultBarrierType(
        duration,
        durationUnit,
        category,
    );

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
