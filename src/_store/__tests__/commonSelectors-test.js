import chai, { expect } from 'chai';
import chaiImmutable from 'chai-immutable';
import { fromJS } from 'immutable';
import { examinedAssetSelector } from '../commonSelectors';

chai.use(chaiImmutable);

describe('examinedAssetSelector', () => {
    it('when no asset is available returns an empty immutable', () => {
        const actual = examinedAssetSelector({
            assets: fromJS([]),
        });
        const expected = fromJS({});
        expect(actual).to.deep.equal(expected);
    });

    it('returns an asset if such exist in list', () => {
        const actual = examinedAssetSelector({
            assets: fromJS([{ symbol: 'abc' }]),
            workspace: fromJS({ examinedAsset: 'abc' }),
        });
        const expected = fromJS({ symbol: 'abc' });
        expect(actual).to.deep.equal(expected);
    });

    it('returns first open asset if not found in list', () => {
        const actual = examinedAssetSelector({
            assets: fromJS([
                { symbol: 'abc', exchange_is_open: 0 },
                { symbol: 'def', exchange_is_open: 1 },
                { symbol: 'ghi', exchange_is_open: 1 },
            ]),
            workspace: fromJS({ examinedAsset: 'not there' }),
        });
        const expected = fromJS({ symbol: 'def', exchange_is_open: 1 });
        expect(actual).to.equal(expected);
    });
});
