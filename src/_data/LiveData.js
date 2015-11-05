import { LiveApi } from 'binary-live-api';
import * as actions from '../_actions';

const handlers = {
    'authorize': 'serverDataAuthorize',
    'balance': 'serverDataBalance',
    'active_symbols': 'serverDataActiveSymbols',
    'trading_times': 'serverDataTradingTimes',
    'asset_index': 'serverDataAssetIndex',
    'portfolio': 'serverDataPortfolio',
    'statement': 'serverDataStatement',
    'tick': 'serverDataTickStream',
    'history': 'serverDataTickHistory',
    'proposal_open_contract': 'serverDataProposalOpenContract',
    'payout_currencies': 'serverDataPayoutCurrencies',
    'profit_table': 'serverDataProfitTable',
    'proposal': 'serverDataProposal',
    'buy': 'serverDataBuy',
};

export const api = new LiveApi();

export const initUnauthorized = () => {
    api.getActiveSymbolsFull();
    api.getTradingTimes();
    api.getAssetIndex();
};

export const initAuthorized = () => {
    api.getPortfolio();
    api.getStatement({ description: 1, limit: 20 });
    api.getProfitTable({ description: 1, limit: 20 });
    api.getPayoutCurrencies();
    api.subscribeToBalance();
    api.subscribeToAllOpenContracts();
};

export const trackSymbols = symbols => {
    api.unsubscribeFromAllTicks();
    api.subscribeToTicks(symbols);
};

export const connect = (store, token) => {
    Object.keys(handlers).forEach(key => {
        const action = actions[handlers[key]];
        api.events.on(key, (data) => store.dispatch(action(data)));
        api.events.on(key, () => window.console.log);
    });

    if (token) {
        api.authorize(token);
    }

    initUnauthorized();

    api.events.on('authorize', initAuthorized);
};
