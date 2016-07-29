import { noOfDecimals, isDurationWithinRange } from 'binary-utils';
import { createDefaultType, createDefaultDuration,
    createDefaultBarriers, createDefaultBarrierType, createDefaultTradeParams } from './DefaultTradeParams';
import { categoryValid, allTimeRelatedFieldValid } from './TradeParamsValidation';

function safeMerge(a, b) {
    const aClone = Object.assign({}, a);
    return Object.assign(aClone, b);
}
// TODO: let all change methods return whole trade obj, easier to reason and debug

export function changeCategory(newCategory, contract, oldTrade) {
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

export function changeSymbol(symbol, contract, oldTrade, changeCat = changeCategory) {
    if (!oldTrade) {
        return createDefaultTradeParams(contract, symbol);
    }

    const selectedCategory = oldTrade.tradeCategory;
    if (!categoryValid(selectedCategory, contract)) {
        return changeCat(Object.keys(contract)[0], contract, safeMerge(oldTrade, { symbol }));
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

        return safeMerge(oldTrade, {
            symbol,
            type: selectedType,
            duration,
            durationUnit,
            dateStart,
            barrier: newBarrier[0],
            barrier2: newBarrier[1],
            barrierType: newBarrierType,
        });
    }
    const newBarrier = createDefaultBarriers(
        contract,
        selectedCategory,
        selectedType,
        selectedDuration, selectedDurationUnit
    );
    const newBarrierType = createDefaultBarrierType(selectedDuration, selectedDurationUnit);
    return safeMerge(oldTrade, {
        symbol,
        barrier: newBarrier[0],
        barrier2: newBarrier[1],
        barrierType: newBarrierType,
    });
}

export function changeType(newType, newCategory, contract, oldTrade) {
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
            newBarrier = createDefaultBarriers(contract, category, newType, duration, durationUnit);
        }

        const newBarrierType = createDefaultBarrierType(duration, durationUnit);
        return safeMerge(oldTrade, {
            tradeCategory: newCategory,
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
    const newBarrier = createDefaultBarriers(contract, category, newType, duration, durationUnit);
    const newBarrierType = createDefaultBarrierType(duration, durationUnit);
    return safeMerge(oldTrade, {
        tradeCategory: newCategory,
        type: newType,
        duration,
        durationUnit,
        dateStart,
        barrier: newBarrier[0],
        barrier2: newBarrier[1],
        barrierType: newBarrierType,
    });
}

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

        return safeMerge(oldTrade, {
            dateStart: newStartDate,
            duration: newDuration.duration,
            durationUnit: newDuration.durationUnit,
            barrier: newBarrier[0],
            barrier2: newBarrier[1],
        });
    } else if (isDurationWithinRange(duration, durationUnit, newDurations)) {
        return safeMerge(oldTrade, { dateStart: newStartDate });
    }

    return safeMerge(oldTrade, {
        dateStart: newStartDate,
        duration: newDurations[0].min,
        durationUnit: newDurations[0].unit,
        barrier: undefined,
        barrier2: undefined,
    });
}

export function changeDurationUnit(newUnit, contract, oldTrade) {
    const { tradeCategory, type, dateStart, duration } = oldTrade;
    const contractPerType = contract[tradeCategory][type];

    let newDuration = duration;
    if (!allTimeRelatedFieldValid(dateStart, newDuration, newUnit, contractPerType)) {
        // only start later
        if (!contractPerType.durations && contractPerType.forwardStartingDuration) {
            newDuration = contractPerType.forwardStartingDuration.options.find(d => d.unit === newUnit).min;
        } else {
            newDuration = contractPerType.durations.find(d => d.unit === newUnit).min;
        }
    }

    // if it's forward starting type, do not update barrier as not applicable
    if (dateStart) {
        return safeMerge(oldTrade, { durationUnit: newUnit, duration: newDuration });
    }

    const newBarrier = createDefaultBarriers(contract, tradeCategory, type, newDuration, newUnit);
    const newBarrierType = createDefaultBarrierType(newDuration, newUnit);
    return safeMerge(oldTrade, {
        duration: newDuration,
        durationUnit: newUnit,
        barrier: newBarrier[0],
        barrier2: newBarrier[1],
        barrierType: newBarrierType,
    });
}

export function changeBarrier(newBarrier, oldTrade) {
    return safeMerge(oldTrade, {
        barrier: newBarrier[0],
        barrier2: newBarrier[1],
    });
}

export function changeAmount(newAmount, oldTrade) {
    const inputDecimalPlaces = noOfDecimals(newAmount);
    const decimalPlaces = inputDecimalPlaces > 2 ? 2 : inputDecimalPlaces;
    return safeMerge(oldTrade, { amount: (+newAmount).toFixed(decimalPlaces) });
}

export function changeAmountPerPoint(newAmountPerPoint) {
    const inputDecimalPlaces = noOfDecimals(newAmountPerPoint);
    const decimalPlaces = inputDecimalPlaces > 2 ? 2 : inputDecimalPlaces;
    return { amountPerPoint: (+newAmountPerPoint).toFixed(decimalPlaces) };
}
