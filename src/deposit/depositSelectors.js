import { createStructuredSelector } from 'reselect';
import { paymentAgentSelector } from '../_store/directSelectors';

const currencySelector = state => state.account.get('currency');
const countrySelector = state => state.settings.get('country');
const emailSelector = state => state.account.get('email');

export default createStructuredSelector({
    paymentAgent: paymentAgentSelector,
    currency: currencySelector,
    country: countrySelector,
    email: emailSelector,
});
