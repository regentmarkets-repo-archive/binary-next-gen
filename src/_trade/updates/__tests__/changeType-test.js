import rawContract from 'binary-test-data/contractsForR50';
import changeType from '../changeType';
import { tradingOptionsForOneSymbol } from '../../../trade-params/TradeParamsSelector';
import areAllTimeFieldsValid from '../../validation/areAllTimeFieldsValid';

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

describe('changeType', () => {
    it('should change type', () => {
        const updatedType = changeType('CALL', 'risefall', mockedContract, mockTickTrade);
        expect(updatedType.type).toEqual('CALL');
    });

    it('should update barrier(s) if target type have barrier(s)', () => {
        const updatedType = changeType('CALL', 'higherlower', mockedContract, mockTickTrade);
        expect(updatedType.type).toEqual('CALL');

        // barrier are added as higherlower need it
        expect(updatedType.barrier).toBeDefined();
    });

    it('should return correct time related params', () => {
        const { dateStart, duration, durationUnit } =
            changeType('CALL', 'higherlower', mockedContract, mockTickTrade);

        expect(areAllTimeFieldsValid(dateStart, duration, durationUnit, mockedContract.higherlower.CALL)).toEqual(true);
    });

    it('should differentiate between higherlower and risefall', () => {
        const highTrade = changeType('CALL', 'higherlower', mockedContract, mockTickTrade);
        expect(highTrade.barrier).toBeDefined();

        const rise = changeType('CALL', 'risefall', mockedContract, mockTickTrade);
        expect(rise.barrier).toBeUndefined();
    });

    it('broken test', () => {
        const input = {
            tradeCategory: 'risefall',
            duration: 5,
            amount: 50,
            durationUnit: 't',
            symbol: 'R_100',
            type: 'CALL',
            basis: 'stake',
        };
        const output = changeType('CALL', 'higherlower', mockedContract, input);
        expect(output.barrier).toBeDefined();
        expect(output.durationUnit).toEqual('t');
    });

    it.skip('should return start later trade if market is close', () => {
        // we are not handling this yet
        expect(false).toEqual(true);
    });
});
