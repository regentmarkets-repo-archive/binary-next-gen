import { LiveApi } from 'binary-live-api';
import * as actions from '../_actions/ServerDataActions';

let instance = null;

const handlers = {
    'authorize': 'serverDataForAuthorize',
    'balance': 'serverDataForBalance',
    'active_symbols': 'serverDataForActiveSymbols',
    'trading_times': 'serverDataForTradingTimes',
    'portfolio': 'serverDataForPortfolio',
    'statement': 'serverDataForStatement',
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
        this.api.authorize('LDj563aNHpoMZ2xpHVB6ghLR9z5PJurPyNKmiNSRgqtRFbjn');
        this.api.getActiveSymbolsBrief();
        this.api.getTradingTimes();
        this.api.getStatement();
        this.api.getBalance();
        this.api.getPortfolio();
    }

    trackActiveSymbols() {
        const list = this.activeSymbols.map(s => s.symbol);

        this.api.trackSymbols(list.slice(list.length - 20));
    }
}
