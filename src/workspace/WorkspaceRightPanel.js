import React from 'react';
import { Tabs } from '../_common';
import TradingTimesContainer from '../trading-times/TradingTimesContainer';
import AssetIndexContainer from '../asset-index/AssetIndexContainer';
import NewsContainer from '../news/NewsContainer';
import VideoListContainer from '../video/VideoListContainer';

export default ({ actions, workspace }) => (
	<div id="right-panel" style={{ width: workspace.get('rightPanelSize') }}>
		<Tabs
			id="right-panel"
			activeIndex={workspace.get('rightActiveTab')}
			onChange={idx => actions.changeActiveTab('right', idx)}
			tabs={[
				{ text: 'Trading Times', component: <TradingTimesContainer compact actions={actions} /> },
				{ text: 'Asset Index', component: <AssetIndexContainer actions={actions}/> },
				{ text: 'Videos', component: <VideoListContainer actions={actions} /> },
				{ text: 'News', component: <NewsContainer actions={actions} /> },
			]}
		/>
	</div>
);
