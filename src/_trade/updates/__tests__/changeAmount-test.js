import changeAmount from '../changeAmount';

describe('changeAmount', () => {
    it('should never return value more than 2 decimal places', () => {
        const newVal = 0.99999;
        const updatedAmount = changeAmount(newVal);
        expect(updatedAmount.amount.length).toEqual(4);
    });
});
