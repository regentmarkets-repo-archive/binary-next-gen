import createDefaultTradeParams from '../defaults/createDefaultTradeParams';
import createDefaultBarrierType from '../defaults/createDefaultBarrierType';
import createDefaultBarriers from '../defaults/createDefaultBarriers';
import createDefaultDuration from '../defaults/createDefaultDuration';
import areAllTimeFieldsValid from '../validation/areAllTimeFieldsValid';
import isCategoryValid from '../validation/isCategoryValid';

export const old = (symbol, contract, isOpen = true) =>
    createDefaultTradeParams(contract, symbol, isOpen);

export default (symbol, contract, oldParams, isOpen = true) => {
    const {
        tradeCategory,
        type,
        duration,
        durationUnit,
        dateStart,
        amount,
        basis,
    } = oldParams;

    let newBarrierType;
    let newBarrier;
    let newBarrier2;
    let newDuration = duration;
    let newDurationUnit = durationUnit;
    let newDateStart = dateStart;

    if (isCategoryValid(tradeCategory, contract)) {
        const contractPerType = contract[tradeCategory][type];

        if (
            !areAllTimeFieldsValid(
                dateStart,
                duration,
                durationUnit,
                contractPerType,
                isOpen,
            )
        ) {
            const defaultDuration = createDefaultDuration(
                contract,
                tradeCategory,
                type,
                isOpen,
            );
            newDuration = defaultDuration.duration;
            newDateStart = defaultDuration.dateStart;
            newDurationUnit = defaultDuration.durationUnit;
        }

        newBarrierType = createDefaultBarrierType(
            newDuration,
            newDurationUnit,
            tradeCategory,
        );
        const newBarriers = createDefaultBarriers({
            contracts: contract,
            category: tradeCategory,
            type,
            duration: newDuration,
            durationUnit: newDurationUnit,
            dateStart: newDateStart,
        });

        newBarrier = newBarriers[0];
        newBarrier2 = newBarriers[1];

        return Object.assign(oldParams, {
            symbol,
            barrierType: newBarrierType,
            barrier: newBarrier,
            barrier2: newBarrier2,
            duration: newDuration,
            durationUnit: newDurationUnit,
            dateStart: newDateStart,
        });
    }
    return Object.assign(createDefaultTradeParams(contract, symbol, isOpen), {
        amount,
        basis,
    });
};
