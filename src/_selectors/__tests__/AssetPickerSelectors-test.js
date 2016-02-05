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
        it('should be retrieved', () => {
            const actual = assetPickerSelectors({
                assets: fromJS([]),
                assetPicker: fromJS({}),
                trades: fromJS([]),
            });
            expect(actual).toExist();
        });
    });

    // describe('assetIndexSelectors', () => {
    //     it('should be initialized successfully', () => {
    //         const actual = assetIndexSelectors({
    //             assetIndex: [
    //                 [[], [], []]
    //             ],
    //             workspace: {
    //                 assetIndex: 0
    //             },
    //         });
    //         expect(actual).toExist();
    //     });
    // });
});
