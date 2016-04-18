import { createStructuredSelector } from 'reselect';

export default createStructuredSelector({
    tradesCount: state => state.workspace.get('tradesCount'),
    layoutN: state => state.workspace.get('layoutN'),
});
