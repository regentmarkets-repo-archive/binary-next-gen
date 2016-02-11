import React from 'react';
import Tabs from '../_common/Tabs';
import MobilePage from '../containers/MobilePage';
import AssetIndexContainer from '../asset-index/AssetIndexContainer';
import TradingTimesContainer from '../trading-times/TradingTimesContainer';

export default class ResourcesMobile extends React.Component {

    constructor(props) {
        super(props);
        this.state = { activeTab: 0 };
    }

    render() {
        const tabs = [
            { text: 'Asset Index', component: <AssetIndexContainer {...this.props} /> },
            { text: 'Trading Times', component: <TradingTimesContainer compact {...this.props} /> },
        ];

        return (
            <MobilePage>
                <Tabs
                    id="settings"
                    activeIndex={this.state.activeTab}
                    onChange={idx => this.setState({ activeTab: idx })}
                    tabs={tabs}
                />
            </MobilePage>
        );
    }
}
