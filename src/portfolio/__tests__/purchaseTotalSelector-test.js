import { fromJS } from 'immutable';
import { expect } from 'chai';
import { purchaseTotalSelector } from '../PortfolioSelectors';

describe('purchaseTotal', () => {
    it('should equal 0 when no contracts', () => {
        const actual = purchaseTotalSelector({
            openContracts: fromJS({}),
        });
        expect(actual).to.equal(0);
    });

    it('list of one item equals this item purchase price', () => {
        const actual = purchaseTotalSelector({
            openContracts: fromJS({
                92001: { buy_price: 10 },
            }),
        });
        expect(actual).to.equal(10);
    });

    it('list of multiple items results in sum of their prices', () => {
        const actual = purchaseTotalSelector({
            openContracts: fromJS({
                1001: { buy_price: 1 },
                2002: { buy_price: 2 },
                3003: { buy_price: 3 },
            }),
        });
        expect(actual).to.equal(6);
    });
});
