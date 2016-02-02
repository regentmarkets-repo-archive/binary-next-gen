import React from 'react';
import { Tabs } from '../_common';
import TradingTimesContainer from '../trading-times/TradingTimesContainer';
import AssetIndexContainer from '../asset-index/AssetIndexContainer';
import NewsContainer from '../news/NewsContainer';
import VideoListContainer from '../video/VideoListContainer';

export default ({ actions, workspace }) => (
	<Tabs
		activeIndex={workspace.rightActiveTab}
		className="right-panel"
		id="right-panel"
		showContent={!workspace.rightPanelHidden}
		onChange={idx => {
			actions.updateWorkspaceField('rightPanelHidden', false);
			actions.changeActiveTab('right', idx);
		}}
		style={workspace.rightPanelHidden ? {} : { width: workspace.rightPanelSize }}
		tabs={[
			{ img: 'img/resources.svg', component: <TradingTimesContainer compact actions={actions} /> },
			{ img: 'img/resources.svg', component: <AssetIndexContainer actions={actions}/> },
			{ img: 'img/news.svg', component: <VideoListContainer actions={actions} /> },
			{ img: 'img/news.svg', component: <NewsContainer actions={actions} /> },
		]}
	/>
);
