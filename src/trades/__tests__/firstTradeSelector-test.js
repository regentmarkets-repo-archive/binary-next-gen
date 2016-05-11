import { fromJS } from 'immutable';
import { expect } from 'chai';
import singleTradeSelectors from '../singleTradeSelectors';

describe('firstTradeSelectors', () => {
    const testState = () => ({
        assets: fromJS([]),
        account: fromJS({}),
        ticks: fromJS({}),
        trades: fromJS([{
            params: {
                symbol: 'R_100',
                tradeCategory: 'risefall',
                duration: 5,
                durationUnit: 't',
                basis: 'stake',
                amount: 50,
                type: 'CALL',
                barrierType: 'relative',
            },
            uiState: {},
            proposalInfo: {},
            purchaseInfo: {},
        }]),
        tradingOptions: fromJS([]),
        tradingTimes: fromJS([]),
    });

    it('should return first trade in list', () => {
        const state = testState();
        const actual = singleTradeSelectors(state);

        expect(actual.params.get('symbol')).to.equal('R_100');
    });
});
