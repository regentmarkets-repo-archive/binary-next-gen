import { createStructuredSelector } from 'reselect';

export default createStructuredSelector({
    acknowledged: state => state.realityCheck.get('acknowledged'),
    interval: state => state.realityCheck.get('interval'),
    showInitial: state => state.realityCheck.get('showInitial'),
    showSummary: state => state.realityCheck.get('showSummary'),
    summary: state => state.realityCheck.get('summary'),
});
