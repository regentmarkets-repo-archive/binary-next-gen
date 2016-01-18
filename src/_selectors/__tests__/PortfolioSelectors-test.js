import expect from 'expect';
import { purchaseTotal, indicativeTotal } from '../PortfolioSelectors';

describe('PortfolioSelectors', () => {
    describe('purchaseTotal', () => {
        it('should equal 0 when no contracts', () => {
            const actual = purchaseTotal({ contracts: [] });
            expect(actual).toEqual(0);
        });

        it('list of one item equals this item purchase price', () => {
            const actual = purchaseTotal({ contracts: [{ buy_price: 50 }] });
            expect(actual).toEqual(50);
        });

        it('list of multiple items results in sum of their prices', () => {
            const actual = purchaseTotal({ contracts: [{ buy_price: 1 }, { buy_price: 2 }, { buy_price: 3 }] });
            expect(actual).toEqual(6);
        });
    });

    describe('indicativeTotal', () => {
         it('should equal 0 for emtpy proposal list', () => {
             const actual = indicativeTotal({ proposals: [] });
             expect(actual).toEqual(0);
         });
     });
});
