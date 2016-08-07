import safeMerge from './safeMerge';
import createDefaultDuration from '../defaults/createDefaultDuration';
import createDefaultBarriers from '../defaults/createDefaultBarriers';
import createDefaultBarrierType from '../defaults/createDefaultBarrierType';
import { allTimeRelatedFieldValid } from '../TradeParamsValidation';

export default (newType, newCategory, contract, oldTrade) => {
    const category = newCategory || oldTrade.tradeCategory;

    if (category === 'spreads') {
        const spread = contract[newCategory][newType].spread;

        return safeMerge(oldTrade, {
            tradeCategory: newCategory,
            type: newType,
            duration: undefined,
            durationUnit: undefined,
            dateStart: undefined,
            barrier: undefined,
            barrier2: undefined,
            amountPerPoint: spread.amountPerPoint.toFixed(2),
            stopType: spread.stopType,
            stopLoss: 30, // hardcode default as backend return wrong info
            stopProfit: spread.stopProfit,
        });
    }
    if (allTimeRelatedFieldValid(
            oldTrade.dateStart,
            oldTrade.duration,
            oldTrade.durationUnit,
            contract[category][newType]
        )) {
        const { dateStart, duration, durationUnit } = oldTrade;
        let newBarrier;
        if (category === oldTrade.tradeCategory && category !== 'digits') {
            newBarrier = [oldTrade.barrier, oldTrade.barrier2];
        } else {
            newBarrier = createDefaultBarriers({
                contracts: contract,
                category,
                type: newType,
                duration,
                durationUnit,
            });
        }

        const newBarrierType = createDefaultBarrierType(duration, durationUnit, category);
        return safeMerge(oldTrade, {
            tradeCategory: category,
            type: newType,
            duration,
            durationUnit,
            dateStart,
            barrier: newBarrier[0],
            barrier2: newBarrier[1],
            barrierType: newBarrierType,
        });
    }

    const newDuration = createDefaultDuration(contract, category, newType);
    const { dateStart, duration, durationUnit } = newDuration;
    const newBarrier = createDefaultBarriers({
        contracts: contract,
        category,
        type: newType,
        duration,
        durationUnit,
    });
    const newBarrierType = createDefaultBarrierType(duration, durationUnit, category);
    return safeMerge(oldTrade, {
        tradeCategory: category,
        type: newType,
        duration,
        durationUnit,
        dateStart,
        barrier: newBarrier[0],
        barrier2: newBarrier[1],
        barrierType: newBarrierType,
    });
};
