import { fromJS, Map } from 'immutable';
import { expect } from 'chai';
import singleTradeSelectors from '../singleTradeSelectors';
import contractsForR50 from 'binary-utils/test-data/contractsForR50';

describe('singleTradeSelectors', () => {
    const emptyState = () => ({
        assets: fromJS([]),
        account: fromJS({}),
        ticks: fromJS({}),
        trades: fromJS([{}]),
        tradingOptions: fromJS([]),
        tradingTimes: fromJS([]),
    });

    it('need to have at least one trade', () => {
        const state = emptyState();
        expect(() => singleTradeSelectors(state)).to.throw;
    });

    const testState = () => ({
        assets: fromJS([{ name: 'some asset' }]),
        account: fromJS({ currency: 'JPY' }),
        ticks: fromJS({ R_9000: [{ quote: 123 }] }),
        trades: fromJS([{ symbol: 'R_9000' }]),
        tradingOptions: new Map({ R_9000: contractsForR50 }),
        tradingTimes: fromJS([]),
    });

    it('will get account curency', () => {
        const state = testState();
        const actual = singleTradeSelectors(state);

        expect(actual.currency).to.equal('JPY');
    });

    it('will select first trade', () => {
        const state = testState();
        const actual = singleTradeSelectors(state);

        expect(actual.trade.toJS().symbol).to.equal('R_9000');
    });

    it('will select last tick', () => {
        const state = testState();
        const actual = singleTradeSelectors(state);

        expect(actual.ticks).to.deep.equal(fromJS([{ quote: 123 }]));
    });

    it('will retrieve contarct for trade', () => {
        const state = testState();
        const actual = singleTradeSelectors(state);
        expect(actual.contract).to.be.ok;
    });

    it('should return the same result for the same state', () => {
        const state = testState();

        const first = singleTradeSelectors(state);
        const second = singleTradeSelectors(state);

        expect(first.assets).to.equal(second.assets);
        expect(first.contract).to.equal(second.contract);
        expect(first.currency).to.equal(second.currency);
        expect(first.tick).to.equal(second.tick);
        expect(first.trade).to.equal(second.trade);

        expect(first).to.equal(second);
    });
});
