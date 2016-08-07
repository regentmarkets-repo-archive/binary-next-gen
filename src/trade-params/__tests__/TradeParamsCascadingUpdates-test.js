import chai, { expect } from 'chai';
import chaiSubset from 'chai-subset';
import rawContract from 'binary-test-data/contractsForR50';
import * as updateHelpers from '../TradeParamsCascadingUpdates';
import { contractsPerSymbol } from '../TradeParamsSelector';
import { allTimeRelatedFieldValid } from '../TradeParamsValidation';

chai.use(chaiSubset);

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
    const mockedContract = contractsPerSymbol(rawContract);

    describe('changeAmountPerPoint', () => {
        it('should never return value more than 2 decimal places', () => {
            const newVal = 0.99999;
            const updatedAmountPerPoint = updateHelpers.changeAmountPerPoint(newVal);
            expect(updatedAmountPerPoint.amountPerPoint).to.have.lengthOf(4);
        });
    });

    describe('changeAmount', () => {
        it('should never return value more than 2 decimal places', () => {
            const newVal = 0.99999;
            const updatedAmount = updateHelpers.changeAmount(newVal);
            expect(updatedAmount.amount).to.have.lengthOf(4);
        });
    });

    describe('changing of barriers', () => {
        it('should always return value without changing', () => {
            const newVal = 0.99999;
            const pipSize3 = 3;
            const pipSize7 = 7;

            const updatedBarrier = updateHelpers.changeBarrier([newVal, newVal], {});
            expect(updatedBarrier.barrier).to.equal(0.99999);
            expect(updatedBarrier.barrier2).to.equal(0.99999);
        });
    });

    describe('changeDurationUnit', () => {
        it('should update durationUnit ', () => {
            const updateDurationUnit = updateHelpers.changeDurationUnit('m', mockedContract, mockTickTrade);
            expect(updateDurationUnit.durationUnit).to.be.equal('m');
        });

        it('should update barrier for trade with barrier(s)', () => {
            const updateDurationUnit = updateHelpers.changeDurationUnit('m', mockedContract, mockEndsInTrade);
            expect(updateDurationUnit.barrier).to.not.equal(mockEndsInTrade.barrier);
        });

        it('should pick a valid duration unit when passed duration unit is not allowed', () => {
            const { duration, durationUnit, dateStart, tradeCategory, type } =
                updateHelpers.changeDurationUnit('ss', mockedContract, mockTickTrade);
            expect(durationUnit).to.not.equal('ss');
            expect(allTimeRelatedFieldValid(dateStart, duration, durationUnit, mockedContract[tradeCategory][type])).to.be.true;
        });

        it('should keep old duration if it is allowed', () => {
            const updated = updateHelpers.changeDurationUnit('m', mockedContract, mockTickTrade);
            expect(updated.duration).to.be.equal(mockTickTrade.duration);
        });

        it('should change duration if old one is not allowed', () => {
            const updated = updateHelpers.changeDurationUnit('s', mockedContract, mockTickTrade);
            expect(updated.duration).to.not.be.equal(mockTickTrade.duration);
        });
    });

    describe('changeStartDate', () => {
        it('should change start date', () => {
            const updatedStartDate = updateHelpers.changeStartDate(1462433402, mockedContract, mockTickTrade);
            expect(updatedStartDate.dateStart).to.be.equal(1462433402);
        });

        it('should not change duration if original duration allow start later', () => {
            const updated = updateHelpers.changeStartDate(1462433402, mockedContract, mockHighTrade);
            expect(updated.durationUnit).to.be.equal(mockHighTrade.durationUnit);
            expect(updated.duration).to.be.equal(mockHighTrade.duration);
        });

        it('should change duration if original duration does not allow start later', () => {
            const updatedStartDate = updateHelpers.changeStartDate(1462433402, mockedContract, mockTickTrade);
            expect(updatedStartDate.durationUnit).to.be.equal('m');
            expect(updatedStartDate.duration).to.be.equal(2);
        });

        it('should not change anything if start later is not allowed for corresponding type', () => {
            const updated = updateHelpers.changeStartDate(1462433402, mockedContract, mockEndsInTrade);
            expect(updated).to.be.deep.equal(mockEndsInTrade);
        });
    });

    describe('changeType', () => {
        it('should change type', () => {
            const updatedType = updateHelpers.changeType('CALL', 'risefall', mockedContract, mockTickTrade);
            expect(updatedType.type).to.be.equal('CALL');
        });

        it('should update barrier(s) if target type have barrier(s)', () => {
            const updatedType = updateHelpers.changeType('CALL', 'higherlower', mockedContract, mockTickTrade);
            expect(updatedType.type).to.be.equal('CALL');

            // barrier are added as higherlower need it
            expect(mockTickTrade).to.not.contains.keys('barrier');
            expect(updatedType).to.contains.keys('barrier');
        });

        it('should return correct time related params', () => {
            const { dateStart, duration, durationUnit } =
                updateHelpers.changeType('CALL', 'higherlower', mockedContract, mockTickTrade);

            expect(allTimeRelatedFieldValid(dateStart, duration, durationUnit, mockedContract.higherlower.CALL)).to.equal(true);
        });

        it('should differentiate between higherlower and risefall', () => {
            const highTrade = updateHelpers.changeType('CALL', 'higherlower', mockedContract, mockTickTrade);
            expect(highTrade.barrier).to.ok;

            const rise = updateHelpers.changeType('CALL', 'risefall', mockedContract, mockTickTrade);
            expect(rise.barrier).to.equal.undefined;
        });

        it('broken test', () => {
            const input = { "tradeCategory":"risefall", "duration":5, "amount":50, "durationUnit":"t" ,"symbol":"R_100", "type":"CALL", "basis":"stake"};
            const output = updateHelpers.changeType('CALL', 'higherlower', mockedContract, input);
            expect(output.barrier).to.be.ok;
            expect(output.durationUnit).to.equal('t');
        });

        it.skip('should return start later trade if market is close', () => {
            // we are not handling this yet
            expect(false).to.equal(true);
        });
    });

    describe('changeCategory', () => {
        it('should change category', () => {
            const updatedCategory = updateHelpers.changeCategory('risefall', mockedContract);
            expect(updatedCategory.tradeCategory).to.equal('risefall');
        });

        it('should setup params for new category if needed', () => {
            const updatedCategory = updateHelpers.changeCategory('spreads', mockedContract);
            expect(updatedCategory).to.contains.keys('stopLoss', 'stopProfit', 'amountPerPoint');
        });

        it('should return start later trade if market is close', () => {
            const updated = updateHelpers.changeCategory('risefall', mockedContract, mockTickTrade, false);
            expect(updated.dateStart).not.equal.undefined;
        });

        it('should NOT return start later trade if market is close', () => {
            const updated = updateHelpers.changeCategory('risefall', mockedContract, mockTickTrade, true);
            expect(updated.dateStart).equal.undefined;
        });

        it('should return a sane params if invalid category is passed into it', () => {
            const { duration, durationUnit, dateStart, tradeCategory, type } =
                updateHelpers.changeCategory('super', mockedContract, mockTickTrade);
            const isValid = allTimeRelatedFieldValid(dateStart, duration, durationUnit, mockedContract[tradeCategory][type]);
            expect(isValid).to.equal(true);
        });
    });

    describe('changeAsset', () => {

    });
});
