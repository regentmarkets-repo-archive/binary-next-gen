import { fromJS } from 'immutable';
import { expect } from 'chai';
import { selectSymbolDigitStat } from '../digitStatsSelectors';

describe('digitstatsSelector', () => {
    it('should return empty array when tradingOptions not available', () => {
        const state = {
            workspace: fromJS({ selectedAsset: 'R_100' }),
            tradingOptions: fromJS({}),
        };
        
        const expected = selectSymbolDigitStat(state);
        expect(expected).to.deep.equal([]);
    });

    it('should return empty array when ticks not available', () => {
        const state = {
            workspace: fromJS({ selectedAsset: 'R_100' }),
            tradingOptions: fromJS({ 'R_100': [{ contract_category: 'digits' }]}),
            ticks: fromJS({}),
        };
        
        const expected = selectSymbolDigitStat(state);
        expect(expected).to.deep.equal([]);
    });

    it('should return array of length 10 when data is in place', () => {
        const state = {
            workspace: fromJS({ selectedAsset: 'R_100' }),
            tradingOptions: fromJS({ 'R_100': []}).setIn(['R_100', 0], { contract_category: 'digits' }),
            ticks: fromJS({ 'R_100': [{ epoch: 0, quote: 1000.00 }] }),
            digitStats: fromJS({ filter: 100 }),
            assets: fromJS([ { symbol: 'R_100', pip: 0.01 }]),
        };

        const expected = selectSymbolDigitStat(state);
        expect(expected).to.have.length(10);
    });

    it('should return stats of ticks', () => {
        const state = {
            workspace: fromJS({ selectedAsset: 'R_100' }),
            tradingOptions: fromJS({ 'R_100': []}).setIn(['R_100', 0], { contract_category: 'digits' }),
            ticks: fromJS({ 'R_100': [
                { epoch: 0, quote: 1000.00 },
                { epoch: 0, quote: 1000.01 },
                { epoch: 0, quote: 1000.00 },
                { epoch: 0, quote: 1000.01 },
                { epoch: 0, quote: 1000.00 },
                { epoch: 0, quote: 1000.01 },
                { epoch: 0, quote: 1000.00 },
                { epoch: 0, quote: 1000.01 },
                { epoch: 0, quote: 1000.00 },
                { epoch: 0, quote: 1000.05 },

            ] }),
            digitStats: fromJS({ filter: 100 }),
            assets: fromJS([ { symbol: 'R_100', pip: 0.01 }]),
        };

        const expected = selectSymbolDigitStat(state);
        expect(expected).to.deep.equal([50, 40, 0, 0, 0, 10, 0, 0, 0, 0]);
    });
});
