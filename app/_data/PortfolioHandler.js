// import { provide } from 'react-redux';

// @provide(store)
export default function portfolioHandler(r) {
    const entry = this.portfolio.find(c => c.id === r.data.id);

    if (!entry) {
        this.portfolio.push(r.data);
    } else {
        Object.assign(entry, r.data);
    }

    this.dataChanged('portfolio');
}
