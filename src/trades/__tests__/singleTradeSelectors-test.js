import { fromJS } from 'immutable';
import { expect } from 'chai';
import singleTradeSelectors from '../singleTradeSelectors';

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
        tradingOptions: fromJS([]),
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

    it('should group available assets', () => {
        const state = testState();
        const actual = singleTradeSelectors(state);

        expect(actual.assets).to.be.ok;
    });

    it.skip('will retrieve contarct for trade', () => {
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
