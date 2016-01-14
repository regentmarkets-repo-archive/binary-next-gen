import expect from 'expect';
import store from '../basicStore';

describe('store', () => {
    it('should work with a series of actions', () => {
        const actual = store.getState();

        expect(actual).toExist();
    });

    it('should work with a series of actions', () => {
        store.dispatch({
            type: 'DO_SOMETHING',
            hello: 'its me',
        });

        const actual = store.getState();

        expect(actual).toExist();
    });
});
