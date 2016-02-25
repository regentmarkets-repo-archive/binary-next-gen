import { expect } from 'chai';
import { flattenSubmarkets } from '../AssetUtils';

describe('flattenSubmarkets', () => {
    it('can be called with an empty list', () => {
        expect(flattenSubmarkets([])).to.not.throw;
    });

    it('when called with empty list as input, returns empty list', () => {
        const flattened = flattenSubmarkets([]);
        expect(flattened).to.deep.equal({});
    });
});
