import { expect } from 'chai';
import store from '../basicStore';

describe('store', () => {
    it('should work with a series of actions', () => {
        const actual = store.getState();

        expect(actual).to.be.ok;
    });

    it('should work with a series of actions', () => {
        store.dispatch({
            type: 'DO_SOMETHING',
            hello: 'world',
        });

        const actual = store.getState();

        expect(actual).to.be.ok;
    });
});
