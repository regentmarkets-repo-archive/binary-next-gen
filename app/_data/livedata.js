import { LiveApi } from 'binary-live-api';
import * as actions from '../_actions/ServerDataActions';

// import Ticks from './Ticks';
import portfolioHandler from './PortfolioHandler';
import ticksHandler from './TicksHandler';
import contractsHandler from './ContractsHandler';

let instance = null;

export default class LiveData {

    constructor(store) {
        if (!instance) {
            instance = this;
        }

        window.console.log('this.props', this.props);

        this.api = new LiveApi();

        this.api.events.on('authorize', (data) => store.dispatch(actions.serverDataForAuthorize(data)));
        this.api.events.on('offerings', (data) => store.dispatch(actions.serverDataForOfferings(data)));
        this.api.events.on('active_symbols', (data) => store.dispatch(actions.serverDataForActiveSymbols(data)));
        this.api.events.on('portfolio', portfolioHandler);
        this.api.events.on('tick', ticksHandler);
        this.api.events.on('contracts', contractsHandler);

        return instance;
    }

    init() {
        this.api.authorize('8NS2r0HzIPiamwR9opmloyibNQowkNdnhssv0UH4HPR9zF1d');
        this.api.getActiveSymbolsByName();
        this.api.getOfferings();
    }

    trackActiveSymbols() {
        const list = this.activeSymbols.map(s => s.symbol);

        this.api.trackSymbols(list.slice(list.length - 20));
    }
}
