import { boughtContractsSelector } from '../_store/directSelectors';
import { createStructuredSelector } from 'reselect';

export default createStructuredSelector({
    // ticks: ticksSelector,
    chartData: state => state.chartData,
    contracts: boughtContractsSelector,
});
