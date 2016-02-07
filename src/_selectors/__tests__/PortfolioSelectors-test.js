import { fromJS } from 'immutable';
import expect from 'expect';
import { purchaseTotalSelector, indicativeTotalSelector } from '../PortfolioSelectors';

describe('PortfolioSelectors', () => {
    describe('purchaseTotal', () => {
        it('should equal 0 when no contracts', () => {
            const actual = purchaseTotalSelector({
                openContracts: fromJS({}),
            });
            expect(actual).toEqual(0);
        });

        it('list of one item equals this item purchase price', () => {
            const actual = purchaseTotalSelector({
                openContracts: fromJS({
                    92001: { buy_price: 10 },
                }),
            });
            expect(actual).toEqual(10);
        });

        it('list of multiple items results in sum of their prices', () => {
            const actual = purchaseTotalSelector({
                openContracts: fromJS({
                    1001: { buy_price: 1 },
                    2002: { buy_price: 2 },
                    3003: { buy_price: 3 },
                }),
            });
            expect(actual).toEqual(6);
        });
    });

    describe('indicativeTotal', () => {
         it('should equal 0 for emtpy proposal list', () => {
             const actual = indicativeTotalSelector({
                 openContracts: fromJS({}),
             });
             expect(actual).toEqual(0);
         });

         it('should equal the sell price of a single proposal', () => {
             const actual = indicativeTotalSelector({
                 openContracts: fromJS({
                     1: { bid_price: 10 },
                 }),
             });
             expect(actual).toEqual(10);
         });

         it('should equal the sum of proposal bid prices', () => {
             const actual = indicativeTotalSelector({
                 openContracts: fromJS({
                     1: { bid_price: 1 },
                     2: { bid_price: 2 },
                     3: { bid_price: 3 },
                 }),
             });
             expect(actual).toEqual(6);
         });
     });
});
