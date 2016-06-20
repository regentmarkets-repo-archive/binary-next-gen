import { createStructuredSelector } from 'reselect';

export default createStructuredSelector({
    interval: state => state.realityCheck.get('interval'),
});
