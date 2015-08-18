// import { provide } from 'react-redux';

// @provide(store)
export default function offeringsHandler(r) {
    this.offerings = r.data.offerings;
    this.dataChanged('offerings', r.data.offerings);
}
