import noOfDecimals from 'binary-utils/lib/noOfDecimals';
import isDurationWithinRange from 'binary-utils/lib/isDurationWithinRange';
import {
    createDefaultType,
    createDefaultDuration,
    createDefaultBarriers,
    createDefaultBarrierType,
} from './DefaultTradeParams';
import { categoryValid, allTimeRelatedFieldValid } from './TradeParamsValidation';

export function changeAsset(oldTrade, contract, changeCat) {
    const selectedCategory = oldTrade.tradeCategory;
    if (!categoryValid(selectedCategory, contract)) {
        return changeCat(Object.keys(contract)[0], contract, oldTrade);
    }

    const selectedType = oldTrade.type;
    const selectedDateStart = oldTrade.dateStart;
    const selectedDuration = oldTrade.duration;
    const selectedDurationUnit = oldTrade.durationUnit;

    if (!allTimeRelatedFieldValid(
            selectedDateStart,
            selectedDuration,
            selectedDurationUnit,
            contract[selectedCategory][selectedType]
        )) {
        const category = oldTrade.tradeCategory;
        const newDuration = createDefaultDuration(contract, category, selectedType);
        const { dateStart, duration, durationUnit } = newDuration;
        const newBarrier = createDefaultBarriers(contract, category, selectedType, duration, durationUnit);
        const newBarrierType = createDefaultBarrierType(duration, durationUnit);

        return {
            type: selectedType,
            duration,
            durationUnit,
            dateStart,
            barrier: newBarrier[0],
            barrier2: newBarrier[1],
            barrierType: newBarrierType,
        };
    }
    const newBarrier = createDefaultBarriers(
        contract,
        selectedCategory,
        selectedType,
        selectedDuration, selectedDurationUnit
    );
    const newBarrierType = createDefaultBarrierType(selectedDuration, selectedDurationUnit);
    return {
        barrier: oldTrade.barrier || newBarrier[0],
        barrier2: oldTrade.barrier2 || newBarrier[1],
        barrierType: newBarrierType,
    };
}

export function changeCategory(newCategory, contract, oldTrade) {
    const defaultType = createDefaultType(contract, newCategory);

    // spreads is special case
    if (newCategory === 'spreads') {
        const spread = contract[newCategory][defaultType].spread;

        return {
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
        };
    }

    if (allTimeRelatedFieldValid(
            oldTrade.dateStart,
            oldTrade.duration,
            oldTrade.durationUnit,
            contract[newCategory][defaultType]
        )) {
        const { dateStart, duration, durationUnit } = oldTrade;
        const newBarrier = createDefaultBarriers(
            contract,
            newCategory,
            defaultType,
            duration,
            durationUnit,
        );
        const newBarrierType = createDefaultBarrierType(duration, durationUnit);
        return {
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
        };
    }

    const newDuration = createDefaultDuration(contract, newCategory, defaultType);
    const { dateStart, duration, durationUnit } = newDuration;
    const newBarrier = createDefaultBarriers(
        contract,
        newCategory,
        defaultType,
        duration,
        durationUnit,
    );
    const newBarrierType = createDefaultBarrierType(duration, durationUnit);

    return {
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
    };
}

export function changeType(newType, newCategory, oldTrade, contract) {
    const category = newCategory || oldTrade.tradeCategory;
    if (allTimeRelatedFieldValid(
            oldTrade.dateStart,
            oldTrade.duration,
            oldTrade.durationUnit,
            contract[category][newType]
        )) {
        const { dateStart, duration, durationUnit } = oldTrade;
        const newBarrier = createDefaultBarriers(contract, category, newType, duration, durationUnit);
        const newBarrierType = createDefaultBarrierType(duration, durationUnit);
        return {
            tradeCategory: newCategory,
            type: newType,
            duration,
            durationUnit,
            dateStart,
            barrier: newBarrier[0],
            barrier2: newBarrier[1],
            barrierType: newBarrierType,
        };
    }

    const newDuration = createDefaultDuration(contract, category, newType);
    const { dateStart, duration, durationUnit } = newDuration;
    const newBarrier = createDefaultBarriers(contract, category, newType, duration, durationUnit);
    const newBarrierType = createDefaultBarrierType(duration, durationUnit);
    return {
        tradeCategory: newCategory,
        type: newType,
        duration,
        durationUnit,
        dateStart,
        barrier: newBarrier[0],
        barrier2: newBarrier[1],
        barrierType: newBarrierType,
    };
}

/**
 * @param newStartDate {number}   - unix epoch
 */
export function changeStartDate(newStartDate, contract, oldTrade) {
    const { duration, durationUnit, tradeCategory, type } = oldTrade;
    const newDurations = contract[tradeCategory][type].forwardStartingDuration.options;

    // do not reset duration unless the old one is not valid
    if (!newStartDate) {
        const newDuration = createDefaultDuration(contract, tradeCategory, type);
        const newBarrier =
            createDefaultBarriers(
                contract,
                tradeCategory,
                type,
                newDuration.duration,
                newDuration.durationUnit
            );

        return {
            dateStart: newStartDate,
            duration: newDuration.duration,
            durationUnit: newDuration.durationUnit,
            barrier: newBarrier[0],
            barrier2: newBarrier[1],
        };
    } else if (isDurationWithinRange(duration, durationUnit, newDurations)) {
        return { dateStart: newStartDate };
    }

    return {
        dateStart: newStartDate,
        duration: newDurations[0].min,
        durationUnit: newDurations[0].unit,
        barrier: undefined,
        barrier2: undefined,
    };
}

export function changeDurationUnit(newUnit, contract, oldTrade) {
    const { tradeCategory, type, duration } = oldTrade;

    // if it's forward starting type, do not update barrier as not applicable
    if (oldTrade.dateStart) {
        return { durationUnit: newUnit };
    }
    const newBarrier = createDefaultBarriers(contract, tradeCategory, type, duration, newUnit);
    const newBarrierType = createDefaultBarrierType(duration, newUnit);
    return {
        durationUnit: newUnit,
        barrier: newBarrier[0],
        barrier2: newBarrier[1],
        barrierType: newBarrierType,
    };
}

export function changeBarrier1(newBarrier) {
    return { barrier: newBarrier };
}

export function changeBarrier2(newBarrier) {
    return { barrier2: newBarrier };
}

export function changeAmount(newAmount) {
    const inputDecimalPlaces = noOfDecimals(newAmount);
    const decimalPlaces = inputDecimalPlaces > 2 ? 2 : inputDecimalPlaces;
    return { amount: (+newAmount).toFixed(decimalPlaces) };
}

export function changeAmountPerPoint(newAmountPerPoint) {
    const inputDecimalPlaces = noOfDecimals(newAmountPerPoint);
    const decimalPlaces = inputDecimalPlaces > 2 ? 2 : inputDecimalPlaces;
    return { amountPerPoint: (+newAmountPerPoint).toFixed(decimalPlaces) };
}
