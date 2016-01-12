import React, { PropTypes, Component } from 'react';
import MobileChart from '../charting/MobileChart';

export default class FullTradeCard extends Component {
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
        const selectedAsset = assetsInfo.selected;
        return (
            <div>
                <MobileChart />
                <div className="row">
                    <button></button>
                    <button></button>
                </div>
            </div>
        );
    }
}
