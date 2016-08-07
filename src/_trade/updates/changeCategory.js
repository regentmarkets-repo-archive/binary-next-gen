import safeMerge from './safeMerge';
import createDefaultType from '../defaults/createDefaultType';
import createDefaultDuration from '../defaults/createDefaultDuration';
import createDefaultBarriers from '../defaults/createDefaultBarriers';
import createDefaultBarrierType from '../defaults/createDefaultBarrierType';
import { allTimeRelatedFieldValid } from '../TradeParamsValidation';

export default (category, contract, oldTrade = {}, isOpen = true) => {
    let newCategory = category;

    if (!contract[newCategory]) {
        newCategory = Object.keys(contract)[0];
    }
    const defaultType = createDefaultType(contract, newCategory);

    // spreads is special case
    if (newCategory === 'spreads') {
        const spread = contract[newCategory][defaultType].spread;

        return safeMerge(oldTrade, {
            tradeCategory: newCategory,
            type: defaultType,
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
            contract[newCategory][defaultType],
            isOpen,
        )) {
        const { dateStart, duration, durationUnit } = oldTrade;
        const newBarrier = createDefaultBarriers({
            contracts: contract,
            category: newCategory,
            type: defaultType,
            duration,
            durationUnit,
        });
        const newBarrierType = createDefaultBarrierType(duration, durationUnit, newCategory);
        return safeMerge(oldTrade, {
            tradeCategory: newCategory,
            type: defaultType,
            duration,
            durationUnit,
            dateStart,
            barrier: newBarrier[0],
            barrier2: newBarrier[1],
            amountPerPoint: undefined,
            stopType: undefined,
            stopLoss: undefined,
            stopProfit: undefined,
            barrierType: newBarrierType,
        });
    }

    const newDuration = createDefaultDuration(contract, newCategory, defaultType, isOpen);
    const { dateStart, duration, durationUnit } = newDuration;
    const newBarrier = createDefaultBarriers({
        contracts: contract,
        category: newCategory,
        type: defaultType,
        duration,
        durationUnit,
    });
    const newBarrierType = createDefaultBarrierType(duration, durationUnit, newCategory);

    return safeMerge(oldTrade, {
        tradeCategory: newCategory,
        type: defaultType,
        duration,
        durationUnit,
        dateStart,
        barrier: newBarrier[0],
        barrier2: newBarrier[1],
        amountPerPoint: undefined,
        stopType: undefined,
        stopLoss: undefined,
        stopProfit: undefined,
        barrierType: newBarrierType,
    });
};
