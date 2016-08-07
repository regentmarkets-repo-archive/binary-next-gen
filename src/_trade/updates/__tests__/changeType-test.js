import { expect } from 'chai';
import rawContract from 'binary-test-data/contractsForR50';
import changeType from '../changeType';
import { contractsPerSymbol } from '../../../trade-params/TradeParamsSelector';
import { allTimeRelatedFieldValid } from '../../TradeParamsValidation';

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

const mockedContract = contractsPerSymbol(rawContract);

describe('changeType', () => {
    it('should change type', () => {
        const updatedType = changeType('CALL', 'risefall', mockedContract, mockTickTrade);
        expect(updatedType.type).to.be.equal('CALL');
    });

    it('should update barrier(s) if target type have barrier(s)', () => {
        const updatedType = changeType('CALL', 'higherlower', mockedContract, mockTickTrade);
        expect(updatedType.type).to.be.equal('CALL');

        // barrier are added as higherlower need it
        expect(mockTickTrade).to.not.contains.keys('barrier');
        expect(updatedType).to.contains.keys('barrier');
    });

    it('should return correct time related params', () => {
        const { dateStart, duration, durationUnit } =
            changeType('CALL', 'higherlower', mockedContract, mockTickTrade);

        expect(allTimeRelatedFieldValid(dateStart, duration, durationUnit, mockedContract.higherlower.CALL)).to.equal(true);
    });

    it('should differentiate between higherlower and risefall', () => {
        const highTrade = changeType('CALL', 'higherlower', mockedContract, mockTickTrade);
        expect(highTrade.barrier).to.ok;

        const rise = changeType('CALL', 'risefall', mockedContract, mockTickTrade);
        expect(rise.barrier).to.equal.undefined;
    });

    it('broken test', () => {
        const input = { "tradeCategory":"risefall", "duration":5, "amount":50, "durationUnit":"t" ,"symbol":"R_100", "type":"CALL", "basis":"stake"};
        const output = changeType('CALL', 'higherlower', mockedContract, input);
        expect(output.barrier).to.be.ok;
        expect(output.durationUnit).to.equal('t');
    });

    it.skip('should return start later trade if market is close', () => {
        // we are not handling this yet
        expect(false).to.equal(true);
    });
});
