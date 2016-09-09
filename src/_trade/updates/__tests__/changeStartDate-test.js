import { expect } from 'chai';
import rawContract from 'binary-test-data/contractsForR50';
import changeStartDate from '../changeStartDate';
import { tradingOptionsForOneSymbol } from '../../../trade-params/TradeParamsSelector';

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
const mockEndsInTrade = {
    showAssetPicker: false,
    tradeCategory: 'endsinout',
    symbolName: 'Volatility 100 Index',
    barrierType: 'relative',
    duration: 2,
    barrier: 49.87,
    amount: 50,
    durationUnit: 'm',
    symbol: 'R_100',
    pipSize: 2,
    type: 'EXPIRYMISS',
    barrier2: -49.67,
    disabled: false,
    basis: 'stake',
};
const mockHighTrade = {
    showAssetPicker: false,
    tradeCategory: 'risefall',
    symbolName: 'Volatility 100 Index',
    barrierType: 'relative',
    duration: 2,
    barrier: 49.87,
    amount: 50,
    durationUnit: 'm',
    symbol: 'R_100',
    pipSize: 2,
    type: 'CALL',
    barrier2: -49.67,
    disabled: false,
    basis: 'stake',
};
const mockedContract = tradingOptionsForOneSymbol(rawContract);

describe('changeStartDate', () => {
    it('should change start date', () => {
        const updatedStartDate = changeStartDate(1462433402, mockedContract, mockTickTrade);
        expect(updatedStartDate.dateStart).to.be.equal(1462433402);
    });

    it('should not change duration if original duration allow start later', () => {
        const updated = changeStartDate(1462433402, mockedContract, mockHighTrade);
        expect(updated.durationUnit).to.be.equal(mockHighTrade.durationUnit);
        expect(updated.duration).to.be.equal(mockHighTrade.duration);
    });

    it('should change duration if original duration does not allow start later', () => {
        const updatedStartDate = changeStartDate(1462433402, mockedContract, mockTickTrade);
        expect(updatedStartDate.durationUnit).to.be.equal('m');
        expect(updatedStartDate.duration).to.be.equal(2);
    });

    it('should not change anything if start later is not allowed for corresponding type', () => {
        const updated = changeStartDate(1462433402, mockedContract, mockEndsInTrade);
        expect(updated).to.be.deep.equal(mockEndsInTrade);
    });
});
