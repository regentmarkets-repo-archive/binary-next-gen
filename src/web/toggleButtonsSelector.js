import { createStructuredSelector } from 'reselect';

export default createStructuredSelector({
    leftPanelVisible: state => state.workspace.get('leftPanelVisible'),
    rightPanelVisible: state => state.workspace.get('rightPanelVisible'),
    tradeMode: state => state.workspace.get('tradeMode'),
});
