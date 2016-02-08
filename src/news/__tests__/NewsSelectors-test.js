import { fromJS } from 'immutable';
import expect from 'expect';
import newsSelectors from '../NewsSelectors';

describe('newsSelectors', () => {
    const emptyState = () => ({
        news: fromJS([]),
    });

    it('should be able to be instantiated', () => {
        const state = emptyState();

        expect(() => newsSelectors(state)).toNotThrow();
    });

    it('should return the same result from the same state', () => {
        const state = emptyState();

        const firstList = newsSelectors(state);
        const secondList = newsSelectors(state);

        expect(firstList).toBe(secondList);
    });
});
