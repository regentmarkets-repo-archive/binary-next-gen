// import { provide } from 'react-redux';

// @provide(store)
export default function authorizeHandler(r) {
    this.balance = {
        currency: r.data.currency,
        amount: +r.data.balance,
    };
    this.dataChanged('balance');
}
