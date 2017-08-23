import { createStructuredSelector } from 'reselect';
import { settingsSelector } from '../_store/directSelectors';

export default createStructuredSelector({
  settings: settingsSelector,
});
