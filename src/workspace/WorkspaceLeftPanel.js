import React from 'react';
import { Tabs } from '../_common';
import AssetSelectorContainer from '../asset-selector/AssetSelectorContainer';
import AssetDetailsContainer from '../asset-details/AssetDetailsContainer';
import WatchlistContainer from '../watchlist/WatchlistContainer';

export default ({ actions, workspace }) => (
	<Tabs
		activeIndex={workspace.get('leftActiveTab')}
		className="left-panel"
		id="left-panel"
		onChange={idx => actions.changeActiveTab('left', idx)}
		style={{ width: workspace.get('leftPanelSize') }}
		tabs={[
			{ text: 'Assets', component: <AssetSelectorContainer actions={actions} /> },
			{ text: 'Watchlist', component: <WatchlistContainer actions={actions} /> },
			{ text: 'Details', component: <AssetDetailsContainer actions={actions} /> },
		]}
	/>
);
