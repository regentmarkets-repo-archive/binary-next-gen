import React, { Component } from 'react';
import Tab from '../_common/Tab';
import TabList from '../_common/TabList';
import MobilePage from '../containers/MobilePage';
import AssetIndexContainer from '../asset-index/AssetIndexContainer';
import TradingTimesContainer from '../trading-times/TradingTimesContainer';

const components = [
	AssetIndexContainer,
	TradingTimesContainer,
];

export default class ResourcesMobile extends Component {

    constructor(props) {
        super(props);
        this.state = { activeTab: 0 };
    }

    render() {
        const { activeTab } = this.state;
        const ActiveComponent = components[activeTab];

        return (
            <MobilePage>
                <TabList
                    className="inverse"
                    activeIndex={activeTab}
                    onChange={idx => this.setState({ activeTab: idx })}
                >
                    <Tab text="Asset Index" />
                    <Tab text="Trading Times" />
                </TabList>
                <ActiveComponent {...this.props} />
            </MobilePage>
        );
    }
}
