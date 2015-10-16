import { LiveApi } from 'binary-live-api';
import * as actions from '../_actions';

let instance = null;

const handlers = {
    'authorize': 'serverDataAuthorize',
    'balance': 'serverDataBalance',
    'active_symbols': 'serverDataActiveSymbols',
    'trading_times': 'serverDataTradingTimes',
    'asset_index': 'serverDataAssetIndex',
    'portfolio': 'serverDataPortfolio',
    'statement': 'serverDataStatement',
    'tick': 'serverDataTickStream',
    'ticks': 'serverDataTickHistory',
    'proposal_open_contract': 'serverDataProposalOpenContract',
    'payout_currencies': 'serverDataPayoutCurrencies',
    'profit_table': 'serverDataProfitTable',
};

export default class LiveData {

    constructor(store) {
        if (!instance) {
            instance = this;
        }

        this.api = new LiveApi();

        Object.keys(handlers).forEach(key => {
            const action = actions[handlers[key]];
            this.api.events.on(key, (data) => store.dispatch(action(data)));
            this.api.events.on(key, () => window.console.log);
        });

        return instance;
    }

    init() {
        this.api.authorize('GTE68xHUZvgS6Cp478EPvYZe6EqJ2CRUtlNYBo7zJ7CXBmdL');
        this.api.getActiveSymbolsFull();
        this.api.getTradingTimes();
        this.api.getAssetIndex();
        this.api.getStatement({ description: 1, limit: 10 });
        this.api.getProfitTable({ description: 1, limit: 10 });
        this.api.getBalance();
        this.api.getPortfolio();
        this.api.getPayoutCurrencies();
        // this.api.subscribeToTicks(['R_50', 'frxUSDJPY', 'RDBEAR']);
    }

    trackActiveSymbols() {
        const list = this.activeSymbols.map(sym => sym.symbol);

        this.api.trackSymbols(list.slice(list.length - 20));
    }

    trackSymbols(symbols) {
        this.api.unsubscribeFromAllTicks();
        this.api.subscribeToTicks(symbols);
    }

    static instance() {
        return instance;
    }
}
