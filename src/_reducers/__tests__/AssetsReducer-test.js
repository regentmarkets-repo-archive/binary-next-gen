import expect from 'expect';
import { fromJS } from 'immutable';
import * as actions from '../../_actions/AssetsActions';
import AssetsReducer from '../AssetsReducer';

describe('AssetsReducers', () => {
    it('by default the state is empty', () => {
        const noAction = { type: '' };
        const initialState = AssetsReducer(undefined, noAction);
        const expected = fromJS([]);
        expect(expected).toEqual(initialState);
    });

    describe('serverDataActiveSymbols', () => {
        it('should be empty on empty server response', () => {
            const action = actions.serverDataActiveSymbols({ active_symbols: [] });
            const stateAfter = AssetsReducer(undefined, action);
            const expected = fromJS([]);
            expect(expected).toEqual(stateAfter);
        });

        it('should contain all server response', () => {
            const assetList = [{
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
            },
            {
                "market": "indices",
                "symbol": "AS51",
                "market_display_name": "Indices",
                "symbol_type": "stockindex",
                "exchange_is_open": 0,
                "submarket": "asia_oceania",
                "display_name": "Australian Index",
                "submarket_display_name": "Asia/Oceania",
                "is_trading_suspended": 0,
                "pip": "0.01"
            }];
            const action = actions.serverDataActiveSymbols({ active_symbols: assetList });
            const stateAfter = AssetsReducer(undefined, action);
            const expected = fromJS(assetList);
            expect(expected).toEqual(stateAfter);
        });
    });
});
