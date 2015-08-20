import { LiveApi } from 'binary-live-api';
import * as actions from '../_actions/ServerDataActions';

let instance = null;

const handlers = {
    'authorize': 'serverDataForAuthorize',
    'offerings': 'serverDataForOfferings',
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
        });

        // this.api.events.on('tick', ticksHandler);
        // this.api.events.on('contracts', contractsHandler);

        return instance;
    }

    init() {
        this.api.authorize('7CpxOxEzktsI95uu5nrbCPLcwSn910Lc2clnY52GKTlqPT0E');
        this.api.getActiveSymbolsByName();
        this.api.getOfferings({ contracts: 1 });
        this.api.getTradingTimes();
        this.api.getStatement();
    }

    trackActiveSymbols() {
        const list = this.activeSymbols.map(s => s.symbol);

        this.api.trackSymbols(list.slice(list.length - 20));
    }
}
