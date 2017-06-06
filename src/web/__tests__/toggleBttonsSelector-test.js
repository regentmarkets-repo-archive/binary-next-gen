import { fromJS } from 'immutable';
import toggleButtonsSelector from '../toggleButtonsSelector';

describe('toggleButtonsSelector', () => {
    const emptyState = () => ({
        workspace: fromJS([]),
    });

    it('should be able to execute', () => {
        const state = emptyState();

        const actual = toggleButtonsSelector(state);

        expect(actual).toBeDefined();
    });

    it('should return the same result for the same state', () => {
        const state = emptyState();

        const first = toggleButtonsSelector(state);
        const second = toggleButtonsSelector(state);

        expect(first).toEqual(second);
    });
});
