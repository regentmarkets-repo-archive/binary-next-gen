import { createStructuredSelector } from 'reselect';
import { paymentAgentSelector } from '../_store/baseSelectors';

const currencySelector = state => state.account.get('currency');
const countrySelector = state => state.settings.get('country');

export default createStructuredSelector({
    paymentAgent: paymentAgentSelector,
    currency: currencySelector,
    country: countrySelector,
});
