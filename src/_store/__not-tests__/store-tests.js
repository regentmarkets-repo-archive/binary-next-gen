import expect from 'expect';
import store from '../configureStore';

describe('store', () => {
    it('should work with a series of actions', () => {
        store.dispatch({
            type: 'DO_IT_NOW_MOTHERCUKER',
            hello: 'its me',
        });

        const actual = store.getState();
        const expected = {
            error: 'for realz',
        };
        expect(actual).toEqual(expected);
    });
});
