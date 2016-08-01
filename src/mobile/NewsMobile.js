import React, { PureComponent } from 'react';
import { Tab, TabList } from 'binary-components';
import MobilePage from '../containers/MobilePage';
import NewsContainerMobile from '../news/NewsContainerMobile';
import VideoListContainer from '../video/VideoListContainer';

const components = [
	NewsContainerMobile,
	VideoListContainer,
];

export default class NewsMobile extends PureComponent {

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
                <TabList
                    activeIndex={activeTab}
                    onChange={this.onTabChange}
                >
                    <Tab text="Daily Report" />
                    <Tab text="Binary TV" />
                </TabList>
                <ActiveComponent {...this.props} />
            </MobilePage>
        );
    }
}
