import { createStructuredSelector } from 'reselect';
import { ticksSelector } from '../_store/directSelectors';

const getLastDigit = (value, pip) =>
    +value.toFixed(pip).toString().slice(-1);

export default createStructuredSelector({
     stats: () => [],
});
