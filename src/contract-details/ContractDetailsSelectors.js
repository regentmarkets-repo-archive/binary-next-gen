import { boughtContractsSelector, ticksSelector } from '../_store/directSelectors';
import { createStructuredSelector } from 'reselect';

export default createStructuredSelector({
    ticks: ticksSelector,
    contracts: boughtContractsSelector,
});
