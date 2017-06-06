import { fromJS } from 'immutable';
import assetPickerSelectors, {
    similarStr,
    assetPickerItemsSelector,
} from '../AssetPickerSelectors';

describe('assetPickerSelectors', () => {
    describe('similarStr', () => {
        it('parameters can be undefined', () => {
            expect(() => similarStr(undefined, undefined)).not.toThrow();
            expect(() => similarStr(undefined, 'abc')).not.toThrow();
            expect(() => similarStr('abc', undefined)).not.toThrow();
        });

        it('undefined matches empty string', () => {
            expect(similarStr(undefined, undefined)).toBeTruthy();
            expect(similarStr(undefined, '')).toBeTruthy();
            expect(similarStr('', undefined)).toBeTruthy();
        });

        it('if text is not contained return false', () => {
            const match = similarStr('abcdefghi', 'xyz');
            expect(match).toBeFalsy();
        });

        it('if text is contained return true', () => {
            const match = similarStr('abcdefghi', 'cde');
            expect(match).toBeTruthy();
        });

        it('if text is contained, regardless of case, return true', () => {
            const match = similarStr('abcdefghi', 'AbC');
            expect(match).toBeTruthy();
        });
    });

    describe('assetPickerItemsSelector', () => {
        const emptyState = () => ({
            assets: fromJS([]),
            assetPicker: fromJS({}),
        });

        it('should work with an empty state', () => {
            const assetPickerItems = assetPickerItemsSelector(emptyState());
            expect(assetPickerItems).toBeDefined();
        });

        it('should return an object', () => {
            const assetPickerItems = assetPickerItemsSelector(emptyState());
            expect(assetPickerItems).toBeInstanceOf(Object);
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

            expect(actual).toBeDefined();
        });

        it('should return the same result for the same state', () => {
            const state = emptyState();

            const first = assetPickerSelectors(state);
            const second = assetPickerSelectors(state);

            expect(first.availableAssets).toEqual(second.availableAssets);
            expect(first.filter).toEqual(second.filter);
            expect(first.workspace).toEqual(second.workspace);
            expect(first.assetPickerItems).toEqual(second.assetPickerItems);

            expect(first).toEqual(second);
        });
    });
});
