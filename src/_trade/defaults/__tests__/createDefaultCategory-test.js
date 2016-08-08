import { expect } from 'chai';
import createDefaultCategory from '../createDefaultCategory';

describe('createDefaultCategory', () => {
    it('should simply take the 1st available category', () => {
        const mock = {
            'asian': {},
        };
        const category = createDefaultCategory(mock);
        expect(category).to.be.equal('asian');
    });
});
