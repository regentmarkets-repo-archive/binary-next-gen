// import { provide } from 'react-redux';

// @provide(store)
export default function activeSymbolsHandler(r) {
    this.activeSymbols = Object.keys(r.data).map(x => r.data[x]);
    this.dataChanged('activeSymbols', this.activeSymbols);
}
