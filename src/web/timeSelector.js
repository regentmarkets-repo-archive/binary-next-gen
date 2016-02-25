import { createStructuredSelector } from 'reselect';

import { serverTimeDiffSelector } from '../_store/directSelectors';

export default createStructuredSelector({
    serverTimeDiff: serverTimeDiffSelector,
});
