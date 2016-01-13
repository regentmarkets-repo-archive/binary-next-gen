import expect from 'expect';
import store from '../persistentStore';

describe('store', () => {
    it('should work with a series of actions', () => {
        store.dispatch({
            type: 'DO_SOMETHING',
            hello: 'its me',
        });

        const actual = store.getState();
        const expected = {
            error: 'for realz',
        };
        expect(actual).toEqual(expected);
    });
});
