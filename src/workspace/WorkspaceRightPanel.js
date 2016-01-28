import React from 'react';
import { Tabs } from '../_common';
import TradingTimesContainer from '../trading-times/TradingTimesContainer';
import AssetIndexContainer from '../asset-index/AssetIndexContainer';
import NewsContainer from '../news/NewsContainer';
import VideoListContainer from '../video/VideoListContainer';

export default ({ actions, workspace }) => (
	<Tabs
		activeIndex={workspace.get('rightActiveTab')}
		className="right-panel"
		id="right-panel"
		onChange={idx => actions.changeActiveTab('right', idx)}
		style={{ width: workspace.get('rightPanelSize') }}
		tabs={[
			{ img: 'img/resources.svg', component: <TradingTimesContainer compact actions={actions} /> },
			{ img: 'img/resources.svg', component: <AssetIndexContainer actions={actions}/> },
			{ img: 'img/news.svg', component: <VideoListContainer actions={actions} /> },
			{ img: 'img/news.svg', component: <NewsContainer actions={actions} /> },
		]}
	/>
);
