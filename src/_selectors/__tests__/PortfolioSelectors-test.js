import expect from 'expect';
import { purchaseTotalSelector, indicativeTotalSelector } from '../PortfolioSelectors';

describe('PortfolioSelectors', () => {
    describe('purchaseTotal', () => {
        it('should equal 0 when no contracts', () => {
            const actual = purchaseTotalSelector({ contracts: [] });
            expect(actual).toEqual(0);
        });

        it('list of one item equals this item purchase price', () => {
            const actual = purchaseTotalSelector({ contracts: [{ buy_price: 50 }] });
            expect(actual).toEqual(50);
        });

        it('list of multiple items results in sum of their prices', () => {
            const actual = purchaseTotalSelector({ contracts: [{ buy_price: 1 }, { buy_price: 2 }, { buy_price: 3 }] });
            expect(actual).toEqual(6);
        });
    });

    // describe('indicativeTotal', () => {
    //      it('should equal 0 for emtpy proposal list', () => {
    //          const actual = indicativeTotalSelector({ proposals: [] });
    //          expect(actual).toEqual(0);
    //      });
    //  });
});
