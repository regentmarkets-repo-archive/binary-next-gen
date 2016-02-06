import { fromJS } from 'immutable';
import expect from 'expect';
import assetPickerSelectors, { similarStr } from '../AssetPickerSelectors';

describe('AssetPickerSelectors', () => {

    describe('similarStr', () => {
        it('parameters can be undefined', () => {
            expect(() => similarStr(undefined, undefined)).toNotThrow();
            expect(() => similarStr(undefined, 'abc')).toNotThrow();
            expect(() => similarStr('abc', undefined)).toNotThrow();
        });

        it('undefined matches empty string', () => {
            expect(similarStr(undefined, undefined)).toEqual(true);
            expect(similarStr(undefined, '')).toEqual(true);
            expect(similarStr('', undefined)).toEqual(true);
        });

        it('if text is not contained return false', () => {
            const match = similarStr('abcdefghi', 'xyz');
            expect(match).toEqual(false);
        });

        it('if text is contained return true', () => {
            const match = similarStr('abcdefghi', 'cde');
            expect(match).toEqual(true);
        });

        it('if text is contained, regardless of case, return true', () => {
            const match = similarStr('abcdefghi', 'AbC');
            expect(match).toEqual(true);
        });
    });

    describe('assetPickerSelectors', () => {

        const emptyState = () => ({
            assets: fromJS([]),
            assetPicker: fromJS({}),
            trades: fromJS([]),
        });

        it('should be able to execute', () => {
            const state = emptyState();

            const actual = assetPickerSelectors(state);

            expect(actual).toExist();
        });

        it('should return the same result for the same state', () => {
            const state = emptyState();

            const first = assetPickerSelectors(state);
            const second = assetPickerSelectors(state);

            expect(first.availableAssets).toBe(second.availableAssets);
            expect(first.filter).toBe(second.filter);
            expect(first.maxTradeId).toBe(second.maxTradeId);
            expect(first.shownAssets).toBe(second.shownAssets);
            expect(first.symbolIds).toBe(second.symbolIds);
            expect(first.watchlist).toBe(second.watchlist);
            expect(first.workspace).toBe(second.workspace);

            expect(first).toBe(second);
        });
    });
});
