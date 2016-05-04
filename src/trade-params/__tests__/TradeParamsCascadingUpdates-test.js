import * as updateHelpers from '../TradeParamsCascadingUpdates';
import { mockedContract } from '../../_constants/MockContract';
import { expect } from 'chai';

describe('Update helpers', () => {
    const mockTrade = {
        showAssetPicker: false,
        tradeCategory: "risefall",
        symbolName: "Volatility 100 Index",
        proposal: {
            longcode: "USD 97.87 payout if Volatility 100 Index after 5 ticks is strictly higher than entry spot.",
            spot: "30331.91",
            display_value: "50.00",
            ask_price: "50.00",
            spot_time: "1462345436",
            date_start: 1462345436,
            id: "5E4868A4-11C6-11E6-B440-06278E83F2F7",
            payout: 97.87
        },
        duration: 5,
        amount: 50,
        durationUnit: "t",
        symbol: "R_100",
        pipSize: 2,
        type: "CALL",
        disabled: false,
        basis: "stake"
    }

    describe('changeAmountPerPoint', () => {
        it('should never return value more than 2 decimal places', () => {
            const newVal = 0.99999;
            const updatedAmountPerPoint = updateHelpers.changeAmountPerPoint(newVal);
            expect(updatedAmountPerPoint.amountPerPoint).to.have.lengthOf(4);
        });
    })

    describe('changeAmount', () => {
        it('should never return value more than 2 decimal places', () => {
            const newVal = 0.99999;
            const updatedAmount = updateHelpers.changeAmount(newVal);
            expect(updatedAmount.amount).to.have.lengthOf(4);
        });
    })

    describe('changing of barriers', () => {
        it('should always return value with decimal places following pipSize', () => {
            const newVal = 0.99999;
            const pipSize3 = { pipSize: 3 };
            const pipSize7 = { pipSize: 7 };

            const updatedBarrier1 = updateHelpers.changeBarrier1(newVal, pipSize3);
            expect(updatedBarrier1.barrier).to.have.lengthOf(5);

            const updatedBarrier2 = updateHelpers.changeBarrier2(newVal, pipSize7);
            expect(updatedBarrier2.barrier2).to.have.lengthOf(9);
        });
    })
    
    describe('changeDurationUnit', () => {
        it('should update durationUnit ', () => {
            const updateDurationUnit = updateHelpers.changeDurationUnit('m', mockedContract, mockTrade);
            expect(updateDurationUnit.durationUnit).to.be.equal('m');
        });
        
        it('should update barrier for trade with barrier(s)', () => {
            // TODO
        });
    });

    describe('changeStartDate', () => {
        it('should change start date', () => {
            
        })
    })
});
