import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import QuickTradeCard from './QuickTradeCard';

@connect(state => ({
    tradingOptions: state.tradingOptions,
    workspace: state.workspace,
    assetPicker: state.assetPicker,
    quickTrade: state.quickTrade,
    proposals: state.proposals,
    currency: state.account.get('currency'),
}))
export default class QuickTradeContainer extends Component {
    static propTypes = {
        tradingOptions: PropTypes.object.isRequired,
        workspace: PropTypes.object.isRequired,
        assetPicker: PropTypes.object.isRequired,
        proposals: PropTypes.object,
        quickTrade: PropTypes.object,
        actions: PropTypes.object.isRequired,
        currency: PropTypes.string.isRequired,
    };

    render() {
        const { tradingOptions, workspace, assetPicker, proposals } = this.props;
        const selected = workspace.get('symbolSelected');
        const availableAssets = assetPicker.get('availableAssets').toJS();
        const assets = availableAssets.map(x => ({ value: x.symbol, text: x.display_name }));

        // quick trade provides tick only trades
        const opt = tradingOptions
            .get(selected, [])
            .filter(t => (t.min_contract_duration && !isNaN(t.min_contract_duration)));
        const proposalsForSelected = proposals.get(selected);
        return (
            <QuickTradeCard
                assetSelected={selected}
                assets={assets}
                trades={opt}
                proposals={proposalsForSelected}
                {...this.props}
            />
        );
    }
}
