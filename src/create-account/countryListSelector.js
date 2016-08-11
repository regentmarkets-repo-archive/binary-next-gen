import { createStructuredSelector } from 'reselect';
import { residenceListSelector } from '../_store/directSelectors';

export default createStructuredSelector({
    residenceList: residenceListSelector,
});
