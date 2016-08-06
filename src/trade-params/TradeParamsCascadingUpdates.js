import { noOfDecimals, isDurationWithinRange } from 'binary-utils';
import createDefaultType from './defaults/createDefaultType';
import createDefaultDuration from './defaults/createDefaultDuration';
import createDefaultBarriers from './defaults/createDefaultBarriers';
import createDefaultBarrierType from './defaults/createDefaultBarrierType';
import createDefaultTradeParams from './defaults/createDefaultTradeParams';
import { allTimeRelatedFieldValid } from './TradeParamsValidation';

function safeMerge(a, b) {
    const aClone = Object.assign({}, a);
    return Object.assign(aClone, b);
}

export function changeCategory(category, contract, oldTrade = {}, isOpen = true) {
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
        const newBarrier = createDefaultBarriers(
            contract,
            newCategory,
            defaultType,
            duration,
            durationUnit,
        );
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
    const newBarrier = createDefaultBarriers(
        contract,
        newCategory,
        defaultType,
        duration,
        durationUnit,
    );
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

export function changeSymbol(symbol, contract, isOpen = true) {
    return createDefaultTradeParams(contract, symbol, isOpen);
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
    const newBarrier = createDefaultBarriers(contract, category, newType, duration, durationUnit);
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

export function changeStartDate(newStartDate, contract, oldTrade) {
    const { duration, durationUnit, tradeCategory, type } = oldTrade;
    const startLaterObj = contract[tradeCategory][type].forwardStartingDuration;

    // ignore if start later not allowed
    if (!startLaterObj) return oldTrade;

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
    }

    // do not reset duration unless the old one is not valid
    const startLaterOptions = startLaterObj.options;
    if (isDurationWithinRange(duration, durationUnit, startLaterOptions)) {
        return safeMerge(oldTrade, { dateStart: newStartDate });
    }

    return safeMerge(oldTrade, {
        dateStart: newStartDate,
        duration: startLaterOptions[0].min,
        durationUnit: startLaterOptions[0].unit,
        barrier: undefined,
        barrier2: undefined,
    });
}

export function changeDurationUnit(unit, contract, oldTrade) {
    const { tradeCategory, type, dateStart, duration } = oldTrade;
    const contractPerType = contract[tradeCategory][type];

    let newUnit = unit;

    // TODO: consider factor this out
    if (['t', 's', 'm', 'h', 'd'].indexOf(newUnit) < 0) {
        newUnit = 't';
    }

    let newDuration = duration;
    if (!allTimeRelatedFieldValid(dateStart, newDuration, newUnit, contractPerType)) {
        // only start later
        const durationsObj = contractPerType.durations;
        const forwardStartingDurationObj = contractPerType.forwardStartingDuration;
        const allowStartLaterOnly = !durationsObj && forwardStartingDurationObj;
        const optionToUse = allowStartLaterOnly ?
            forwardStartingDurationObj.options.find(d => d.unit === newUnit) :
            durationsObj.find(d => d.unit === newUnit);

        newDuration = optionToUse.min;
    }

    // if it's forward starting type, do not update barrier as not applicable
    if (dateStart) {
        return safeMerge(oldTrade, { durationUnit: newUnit, duration: newDuration });
    }

    const newBarrier = createDefaultBarriers(contract, tradeCategory, type, newDuration, newUnit);
    const newBarrierType = createDefaultBarrierType(newDuration, newUnit, tradeCategory);
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
