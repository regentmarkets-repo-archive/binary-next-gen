import React from 'react';
import { MobilePage, Tabs } from '../_common';
import NewsContainer from '../news/NewsContainer';
import VideoListContainer from '../video/VideoListContainer';

export default class NewsMobile extends React.Component {

    constructor(props) {
        super(props);
        this.state = { activeTab: 0 };
    }

    render() {
        const tabs = [
            { text: 'Daily Report', component: <NewsContainer /> },
            { text: 'Binary TV', component: <VideoListContainer /> },
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
