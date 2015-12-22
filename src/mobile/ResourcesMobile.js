import React from 'react';
import { MobilePage, Tabs } from '../_common';
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
