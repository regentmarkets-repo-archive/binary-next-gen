import { fromJS } from 'immutable';
import { expect } from 'chai';
import { purchaseTotalSelector } from '../PortfolioSelectors';

describe('purchaseTotal', () => {
    it('should equal 0 when no contracts', () => {
        const actual = purchaseTotalSelector({
            boughtContracts: fromJS({}),
        });
        expect(actual).to.equal(0);
    });

    it('list of one item equals this item purchase price', () => {
        const actual = purchaseTotalSelector({
            boughtContracts: fromJS({
                92001: { contract_id: 1, buy_price: 10 },
            }),
        });
        expect(actual).to.equal(10);
    });

    it('list of multiple items results in sum of their prices', () => {
        const actual = purchaseTotalSelector({
            boughtContracts: fromJS({
                1001: { contract_id: 1, buy_price: 1 },
                2002: { contract_id: 2, buy_price: 2 },
                3003: { contract_id: 3, buy_price: 3 },
            }),
        });
        expect(actual).to.equal(6);
    });
});
