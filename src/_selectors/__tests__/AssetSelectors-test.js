import { fromJS } from 'immutable';
import expect from 'expect';
import { assetsSelector, marketTreeSelector } from '../AssetSelectors';

describe('AssetSelectors', () => {
    describe('assetSelector', () => {
        it('should equal empty list when no assets', () => {
            const actual = assetsSelector({
                assets: [],
            });
            expect(actual).toEqual([]);
        });

        it('should equal the full assets list', () => {
            const assetList = [
                { id: 1, name: 'Asset1' },
                { id: 2, name: 'Asset2' },
                { id: 3, name: 'Asset3' },
            ];
            const actual = assetsSelector({
                assets: assetList,
            });
            expect(actual).toEqual(assetList);
        });
    });

    describe('marketTreeSelector', () => {
        it('should equal empty tree when no assets', () => {
            const actual = marketTreeSelector({
                assets: [],
            });
            expect(actual).toEqual(fromJS({}));
        });

        it('should contain one asset inside tree when one asset is provided', () => {
            const actual = marketTreeSelector({
                assets: fromJS([{
                    market: 'indices',
                    symbol: 'AEX',
                    market_display_name: 'Indices',
                    submarket: 'europe_africa',
                    display_name: 'Dutch Index',
                    submarket_display_name: 'Europe/Africa',
                }]),
            });
            const expected = fromJS({
                indices: {
                    display_name: 'Indices',
                    submarkets: {
                        europe_africa: {
                            display_name: 'Europe/Africa',
                            symbols: {
                                AEX: {
                                    display_name: 'Dutch Index',
                                },
                            },
                        },
                    },
                },
            });
            expect(actual).toEqual(expected);
        });

        it('should deep nest assets correctly into a tree', () => {
            const actual = marketTreeSelector({
                assets: fromJS([{
                    market: 'indices',
                    symbol: 'AEX',
                    market_display_name: 'Indices',
                    submarket: 'europe_africa',
                    display_name: 'Dutch Index',
                    submarket_display_name: 'Europe/Africa',
                },
                {
                    market: 'indices',
                    symbol: 'AS51',
                    market_display_name: 'Indices',
                    submarket: 'asia_oceania',
                    display_name: 'Australian Index',
                    submarket_display_name: 'Asia/Oceania',
                },
                {
                    market: 'indices',
                    symbol: 'BFX',
                    market_display_name: 'Indices',
                    submarket: 'europe_africa',
                    display_name: 'Belgian Index',
                    submarket_display_name: 'Europe/Africa',
                }]),
            });
            const expected = fromJS({
                indices: {
                    display_name: 'Indices',
                    submarkets: {
                        europe_africa: {
                            display_name: 'Europe/Africa',
                            symbols: {
                                AEX: {
                                    display_name: 'Dutch Index',
                                },
                                BFX: {
                                    display_name: 'Belgian Index',
                                },
                            },
                        },
                        asia_oceania: {
                            display_name: 'Asia/Oceania',
                            symbols: {
                                AS51: {
                                    display_name: 'Australian Index',
                                },
                            },
                        },
                    },
                },
            });
            expect(actual).toEqual(expected);
        });
    });
});
