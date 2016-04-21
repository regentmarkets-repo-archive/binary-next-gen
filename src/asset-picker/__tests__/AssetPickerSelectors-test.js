import { fromJS, List } from 'immutable';
import { expect } from 'chai';
import assetPickerSelectors, {
    similarStr,
    assetPickerItemsSelector,
} from '../AssetPickerSelectors';

describe('assetPickerSelectors', () => {
    describe('similarStr', () => {
        it('parameters can be undefined', () => {
            expect(() => similarStr(undefined, undefined)).to.not.throw();
            expect(() => similarStr(undefined, 'abc')).to.not.throw();
            expect(() => similarStr('abc', undefined)).to.not.throw();
        });

        it('undefined matches empty string', () => {
            expect(similarStr(undefined, undefined)).to.be.true;
            expect(similarStr(undefined, '')).to.be.true;
            expect(similarStr('', undefined)).to.be.true;
        });

        it('if text is not contained return false', () => {
            const match = similarStr('abcdefghi', 'xyz');
            expect(match).to.be.false;
        });

        it('if text is contained return true', () => {
            const match = similarStr('abcdefghi', 'cde');
            expect(match).to.be.true;
        });

        it('if text is contained, regardless of case, return true', () => {
            const match = similarStr('abcdefghi', 'AbC');
            expect(match).to.be.true;
        });
    });

    describe('assetPickerItemsSelector', () => {
        const emptyState = () => ({
            assets: fromJS([]),
            assetPicker: fromJS({}),
        });

        it('should work with an empty state', () => {
            const assetPickerItems = assetPickerItemsSelector(emptyState());
            expect(assetPickerItems).to.be.ok;
        });

        it('should return an object', () => {
            const assetPickerItems = assetPickerItemsSelector(emptyState());
            expect(assetPickerItems).to.be.instanceOf(Object);
        });
    });

    describe('assetPickerSelectors', () => {
        const emptyState = () => ({
            assets: fromJS([]),
            assetPicker: fromJS({}),
            trades: fromJS([]),
            workspace: fromJS({}),
        });

        it('should be able to execute', () => {
            const state = emptyState();

            const actual = assetPickerSelectors(state);

            expect(actual).to.be.ok;
        });

        it('should return the same result for the same state', () => {
            const state = emptyState();

            const first = assetPickerSelectors(state);
            const second = assetPickerSelectors(state);

            expect(first.availableAssets).to.equal(second.availableAssets);
            expect(first.filter).to.equal(second.filter);
            expect(first.workspace).to.equal(second.workspace);
            expect(first.assetPickerItems).to.equal(second.assetPickerItems);

            expect(first).to.equal(second);
        });
    });
});
