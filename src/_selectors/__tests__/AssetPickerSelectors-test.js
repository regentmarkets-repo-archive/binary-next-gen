import { fromJS } from 'immutable';
import expect from 'expect';
import assetPickerSelectors from '../AssetPickerSelectors';

describe('AssetPickerSelectors', () => {

    describe('assetPickerSelectors', () => {
        it('should be retrieved', () => {
            const actual = assetPickerSelectors({
                assets: []
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
