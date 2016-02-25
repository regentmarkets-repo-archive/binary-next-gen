import { createStructuredSelector } from 'reselect';

import { serverTimeSelector } from '../_store/directSelectors';


export default createStructuredSelector({
    time: serverTimeSelector,
});
