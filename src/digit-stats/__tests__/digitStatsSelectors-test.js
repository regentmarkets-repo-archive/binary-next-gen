import { fromJS } from 'immutable';
import digitStatsSelector from '../digitStatsSelectors';

describe('digitstatsSelector', () => {
    it('should return undefined when tradingOptions not available', () => {
        const state = {
            workspace: fromJS({ examinedAsset: 'R_100' }),
            tradingOptions: fromJS({}),
            assets: fromJS([{ symbol: 'R_100' }]),
        };

        const expected = digitStatsSelector(state);
        expect(expected).toBeUndefined();
    });

    it('should return undefined when ticks not available', () => {
        const state = {
            workspace: fromJS({ examinedAsset: 'R_100' }),
            tradingOptions: fromJS({ R_100: [{ contract_category: 'digits' }] }),
            ticks: fromJS({}),
            assets: fromJS([{ symbol: 'R_100' }]),
        };

        const expected = digitStatsSelector(state);
        expect(expected).toBeUndefined();
    });

    it('should return array of length 10 when data is in place on stats key', () => {
        const state = {
            workspace: fromJS({ examinedAsset: 'R_100' }),
            tradingOptions: fromJS({ R_100: [] }).setIn(['R_100', 0], { contract_category: 'digits' }),
            ticks: fromJS({ R_100: [{ epoch: 0, quote: 1000.00 }] }),
            digitStats: fromJS({ filter: 100 }),
            assets: fromJS([{ symbol: 'R_100', pip: 0.01 }]),
        };

        const { stats } = digitStatsSelector(state);
        expect(stats.length).toEqual(10);
    });

    it('should return stats of ticks', () => {
        const state = {
            workspace: fromJS({ examinedAsset: 'R_100' }),
            tradingOptions: fromJS({ R_100: [] }).setIn(['R_100', 0], { contract_category: 'digits' }),
            ticks: fromJS({ R_100: [
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
            assets: fromJS([{ symbol: 'R_100', pip: 0.01 }]),
        };

        const { stats } = digitStatsSelector(state);
        expect(stats).toEqual([50, 40, 0, 0, 0, 10, 0, 0, 0, 0]);
    });
});
