import changeAmount from '../changeAmount';

describe('changeAmount', () => {
    it('should never return value more than 8 decimal places', () => {
        const newVal = 0.9999999999;
        const updatedAmount = changeAmount(newVal);
        expect(updatedAmount.amount.length).toEqual(10);
    });
});
