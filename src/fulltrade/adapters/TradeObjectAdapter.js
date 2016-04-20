import numberToSignedString from 'binary-utils/lib/numberToSignedString';

export const internalTradeModelToServerTradeModel = tradeObj => {
    const {
        amount,
        basis,
        type,
        dateStart,
        duration,
        durationUnit,
        symbol,
        barrier,
        barrier2,
        amountPerPoint,
        stopType,
        stopProfit,
        stopLoss,
        barrierType,
        pipSize,
    } = tradeObj;

    const b1 = barrier && (barrierType === 'relative' ? numberToSignedString(barrier) : barrier);
    const b2 = barrier2 && (barrierType === 'relative' ? numberToSignedString(barrier2) : barrier2);

    const serverModel = {
        amount,
        amount_per_point: amountPerPoint,
        basis,
        contract_type: type,
        duration,
        date_start: dateStart,
        duration_unit: durationUnit,
        symbol,
        barrier: b1,
        barrier2: b2,
        barrierType,
        pipSize,
        stop_type: stopType,
        stop_profit: stopProfit,
        stop_loss: stopLoss,
    };

    return serverModel;
};
