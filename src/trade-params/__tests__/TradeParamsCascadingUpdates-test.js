import * as updateHelpers from '../TradeParamsCascadingUpdates';
import { mockedContract } from '../../_constants/MockContract';
import chai, { expect } from 'chai';
import chaiSubset from 'chai-subset';

chai.use(chaiSubset);

describe('Update helpers', () => {
    const mockTickTrade = {
        showAssetPicker: false,
        tradeCategory: 'risefall',
        symbolName: 'Volatility 100 Index',
        proposal: {
            longcode: 'USD 97.87 payout if Volatility 100 Index after 5 ticks is strictly higher than entry spot.',
            spot: '30331.91',
            display_value: '50.00',
            ask_price: '50.00',
            spot_time: '1462345436',
            date_start: 1462345436,
            id: '5E4868A4-11C6-11E6-B440-06278E83F2F7',
            payout: 97.87,
        },
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
        proposal: {
            longcode: 'USD 120.13 payout if Volatility 100 Index ends outside entry spot minus 49.67 to entry spot plus 49.87 at 2 minutes after contract start time.',
            spot: '30297.76',
            display_value: '50.00',
            ask_price: '50.00',
            spot_time: '1462346774',
            date_start: 1462346774,
            id: '778D99E4-11C9-11E6-BE96-9360E1BD001D',
            payout: 120.13,
        },
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
    });

    describe('changeStartDate', () => {
        it('should change start date', () => {
            const updatedStartDate = updateHelpers.changeStartDate(1462433402, mockedContract, mockTickTrade);
            expect(updatedStartDate.dateStart).to.be.equal(1462433402);
        });

        it('should change duration if original duration does not allow start later', () => {
            const updatedStartDate = updateHelpers.changeStartDate(1462433402, mockedContract, mockTickTrade);
            expect(updatedStartDate.durationUnit).to.be.equal('m');
            expect(updatedStartDate.duration).to.be.equal(2);
        });
    });

    describe('changeType', () => {
        it('should change type', () => {
            const updatedType = updateHelpers.changeType('SPREADU', 'spreads', mockedContract, mockTickTrade);
            expect(updatedType.type).to.be.equal('SPREADU');
        });

        it('should update barrier(s) if target type have barrier(s)', () => {
            const updatedType = updateHelpers.changeType('CALL', 'higherlower', mockedContract, mockTickTrade);
            expect(updatedType.type).to.be.equal('CALL');

            // barrier are added as higherlower need it
            expect(mockTickTrade).to.not.contains.keys('barrier');
            expect(updatedType).to.contains.keys('barrier');
        });
    });

    describe('changeCategory', () => {
        it('should change category', () => {
            const updatedCategory = updateHelpers.changeCategory('spreads', mockedContract);
            expect(updatedCategory.tradeCategory).to.equal('spreads');
        });

        it('should setup params for new category if needed', () => {
            const updatedCategory = updateHelpers.changeCategory('spreads', mockedContract);
            expect(updatedCategory).to.contains.keys('stopLoss', 'stopProfit', 'amountPerPoint');
        });
    });

    describe('changeAsset', () => {
        it('should retain old params if new asset allows', () => {
            const updatedAsset = updateHelpers.changeSymbol('R_100', mockedContract, mockTickTrade);
            const mergedWithUpdatedAsset = Object.assign({}, mockTickTrade, updatedAsset);
            // containSubset is used because changeAsset will set undefined to barriers
            expect(mergedWithUpdatedAsset).to.containSubset(mockTickTrade);
        });
    });
});
