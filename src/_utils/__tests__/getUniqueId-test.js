import { expect } from 'chai';
import getUniqueId from '../getUniqueId';

describe('getUniqueId', () => {
    it('ids start from 0', () => {
        const id = getUniqueId();
        expect(id).to.equal(0);
    });

    it('next ids requested are sequential', () => {
        expect(getUniqueId()).to.equal(1);
        expect(getUniqueId()).to.equal(2);
    });

    it('ids are globally unique', () => {
        const id1 = getUniqueId();
        const id2 = getUniqueId();
        expect(id1).to.not.equal(id2);
    });
});
