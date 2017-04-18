import React, { PureComponent } from 'react';
import { Tab, TabList } from 'binary-components';
import MobilePage from '../containers/MobilePage';
import AssetIndexContainer from '../asset-index/AssetIndexContainer';
import TradingTimesContainer from '../trading-times/TradingTimesContainer';

const components = [AssetIndexContainer, TradingTimesContainer];

export default class ResourcesMobile extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { activeTab: 0 };
    }

    onTabChange = idx => this.setState({ activeTab: idx });

    render() {
        const { activeTab } = this.state;
        const ActiveComponent = components[activeTab];

        return (
            <MobilePage>
                <TabList activeIndex={activeTab} onChange={this.onTabChange}>
                    <Tab text="Asset Index" />
                    <Tab text="Trading Times" />
                </TabList>
                <ActiveComponent {...this.props} />
            </MobilePage>
        );
    }
}
