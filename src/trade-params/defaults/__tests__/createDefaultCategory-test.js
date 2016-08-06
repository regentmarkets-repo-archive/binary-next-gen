import { expect } from 'chai';
import createDefaultCategory from '../createDefaultCategory';
import { mockedContract } from '../../../_constants/MockContract';

describe('createDefaultCategory', () => {
    it('should simply take the 1st available category', () => {
        const category = createDefaultCategory(mockedContract);
        expect(category).to.be.equal('asian');
    });
});
