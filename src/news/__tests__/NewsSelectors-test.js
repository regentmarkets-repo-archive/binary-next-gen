import { fromJS } from 'immutable';
import { expect } from 'chai';
import newsSelectors from '../newsSelectors';

describe('newsSelectors', () => {
    const emptyState = () => ({
        news: fromJS([]),
    });

    it('should be able to be instantiated', () => {
        const state = emptyState();

        expect(() => newsSelectors(state)).to.not.throw();
    });

    it('should return the same result from the same state', () => {
        const state = emptyState();

        const firstList = newsSelectors(state);
        const secondList = newsSelectors(state);

        expect(firstList).to.equal(secondList);
    });
});
