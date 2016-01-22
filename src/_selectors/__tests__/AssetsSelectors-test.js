import { fromJS } from 'immutable';
import expect from 'expect';
import { assetsSelector, marketTreeSelector } from '../AssetsSelectors';

describe('AssetsSelectors', () => {
    describe('assetsSelector', () => {
        it('should equal empty list when no assets', () => {
            const actual = assetsSelector({
                assets: []
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
                assets: assetList
            });
            expect(actual).toEqual(assetList);
        });
    });

    describe('marketTreeSelector', () => {
        it('should equal empty tree when no assets', () => {
            const actual = marketTreeSelector({
                assets: []
            });
            expect(actual).toEqual({});
        });

        it('should contain one asset inside tree when one asset is provided', () => {
            const actual = marketTreeSelector({
                assets: [{
                    "market": "indices",
                    "symbol": "AEX",
                    "market_display_name": "Indices",
                    "symbol_type": "stockindex",
                    "exchange_is_open": 0,
                    "submarket": "europe_africa",
                    "display_name": "Dutch Index",
                    "submarket_display_name": "Europe/Africa",
                    "is_trading_suspended": 0,
                    "pip": "0.01"
                }]
            });
            const expected = {
                "indices": {
                    "display_name": "Indices",
                    "submarkets": {
                        "europe_africa": {
                            "display_name": "Europe/Africa",
                            "symbols": {
                                "AEX": {
                                    "display_name": "Dutch Index"
                                }
                            }
                        }
                    }
                }
            };
            expect(actual).toEqual(expected);
        });
    });
});
