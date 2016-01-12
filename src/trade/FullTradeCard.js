import React, { PropTypes, Component } from 'react';
import MobileChart from '../charting/MobileChart';
import AssetSelectorContainer from '../asset-selector/AssetSelectorContainer';
import FullTradeCategorySelector from './FullTradeCategorySelector';
import FullTradeTypeSelector from './FullTradeTypeSelector';
import FullTradeBarriers from './FullTradeBarriers';
import FullTradeDuration from './FullTradeDuration';
import FullTradePayout from './FullTradePayout';
import { Modal } from '../_common';

export default class FullTradeCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAssets: false,
            showTradingType: false,
        };
    }

    static propTypes = {
        assetsInfo: PropTypes.array.isRequired,
        tradingTypes: PropTypes.array.isRequired,
        barriersInfo: PropTypes.array.isRequired,
        durationInfo: PropTypes.object.isRequired,
        payoutInfo: PropTypes.object.isRequired,
        ticksInfo: PropTypes.array.isRequired,
    };

    render() {
        const { assetsInfo, tradingTypes, barriersInfo, durationInfo, payoutInfo, ticksInfo } = this.props;
        const { showAssets } = this.state;
        const

        return (
            <div>
                <MobileChart history={ticksInfo.ticks} />
                <div className="row">
                    <button onClick={() => this.setState({ showAssets: true })}>{assetsInfo.selected}</button>
                    <Modal shown={showAssets} onClose={() => this.setState({ showAssets: false })}>
                        <AssetSelectorContainer/>
                    </Modal>
                    <FullTradeCategorySelector {...tradingTypes} />
                    <FullTradeTypeSelector {} />
                    <FullTradeDuration {...durationInfo} />
                    <FullTradeBarriers barriersInfo={barriersInfo} />
                    <FullTradePayout {...payoutInfo} />
                </div>
            </div>
        );
    }
}
