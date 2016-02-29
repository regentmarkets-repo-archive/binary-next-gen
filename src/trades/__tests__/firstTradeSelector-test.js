import { fromJS } from 'immutable';
import { expect } from 'chai';
import singleTradeSelectors from '../singleTradeSelectors';

describe('firstTradeSelectors', () => {

    const testState = () => ({
        assets: fromJS([]),
        account: fromJS({}),
        ticks: fromJS({}),
        trades: fromJS([{ name: 'some trade' }]),
        tradingOptions: fromJS([]),
        tradingTimes: fromJS([]),
        appState: fromJS({ authorized: true }),
    });

    it('should return first trade in list', () => {
        const state = testState();
        const actual = singleTradeSelectors(state);

        expect(actual.trade.get('name')).to.equal('some trade');
    });
});

