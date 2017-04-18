import { noOfDecimals } from 'binary-utils';

export default newAmountPerPoint => {
    const inputDecimalPlaces = noOfDecimals(newAmountPerPoint);
    const decimalPlaces = inputDecimalPlaces > 2 ? 2 : inputDecimalPlaces;
    return { amountPerPoint: (+newAmountPerPoint).toFixed(decimalPlaces) };
};
