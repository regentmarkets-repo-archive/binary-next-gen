import rawContract from 'binary-test-data/contractsForR50';
import changeCategory from '../changeCategory';
import { tradingOptionsForOneSymbol } from '../../../trade-params/TradeParamsSelector';
import areAllTimeFieldsValid from '../../validation/areAllTimeFieldsValid';

describe('Update helpers', () => {
    const mockTickTrade = {
        showAssetPicker: false,
        tradeCategory: 'risefall',
        symbolName: 'Volatility 100 Index',
        duration: 5,
        amount: 50,
        durationUnit: 't',
        symbol: 'R_100',
        pipSize: 2,
        type: 'CALL',
        disabled: false,
        basis: 'stake',
    };
    const mockedContract = tradingOptionsForOneSymbol(rawContract);

    describe('changeCategory', () => {
        it('should change category', () => {
            const updatedCategory = changeCategory('risefall', mockedContract);
            expect(updatedCategory.tradeCategory).toEqual('risefall');
        });

        it('should setup params for new category if needed', () => {
            const updatedCategory = changeCategory('spreads', mockedContract);
            expect(updatedCategory.hasOwnProperty('stopLoss')).toBeTruthy();
            expect(updatedCategory.hasOwnProperty('stopProfit')).toBeTruthy();
            expect(updatedCategory.hasOwnProperty('amountPerPoint')).toBeTruthy();
        });

        it('should return start later trade if market is close', () => {
            const updated = changeCategory('risefall', mockedContract, mockTickTrade, false);
            expect(updated.hasOwnProperty('dateStart')).toBeTruthy();
        });

        it('should NOT return start later trade if market is close', () => {
            const updated = changeCategory('risefall', mockedContract, mockTickTrade, true);
            expect(updated.dateStart).toBeUndefined();
        });

        it('should return a sane params if invalid category is passed into it', () => {
            const { duration, durationUnit, dateStart, tradeCategory, type } =
                changeCategory('super', mockedContract, mockTickTrade);
            const isValid = areAllTimeFieldsValid(dateStart, duration, durationUnit, mockedContract[tradeCategory][type]);
            expect(isValid).toEqual(true);
        });
    });
});
