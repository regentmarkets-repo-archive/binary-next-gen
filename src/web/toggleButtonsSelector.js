import { createStructuredSelector } from 'reselect';

export default createStructuredSelector({
    leftPanelVisible: state => state.workspace.get('leftPanelVisible'),
    sidePanelVisible: state => state.workspace.get('sidePanelVisible'),
    tradeMode: state => state.workspace.get('tradeMode'),
});
