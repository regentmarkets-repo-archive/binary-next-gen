import React, { Component } from 'react';
import Tab from 'binary-components/lib/Tab';
import TabList from 'binary-components/lib/TabList';
import MobilePage from '../containers/MobilePage';
import NewsContainerMobile from '../news/NewsContainerMobile';
import VideoListContainer from '../video/VideoListContainer';

const components = [
	NewsContainerMobile,
	VideoListContainer,
];

export default class NewsMobile extends Component {

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
                    <Tab text="Daily Report" />
                    <Tab text="Binary TV" />
                </TabList>
                <ActiveComponent {...this.props} />
            </MobilePage>
        );
    }
}
