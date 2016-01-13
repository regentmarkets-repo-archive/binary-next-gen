import React from 'react';
import { Tabs } from '../_common';
import AssetSelectorContainer from '../asset-selector/AssetSelectorContainer';
import AssetDetailsContainer from '../asset-details/AssetDetailsContainer';
import WatchlistContainer from '../watchlist/WatchlistContainer';

export default ({ actions, workspace }) => (
	<div id="left-panel" style={{ width: workspace.get('leftPanelSize') }}>
		<Tabs
			id="left-panel"
			activeIndex={workspace.get('leftActiveTab')}
			onChange={idx => actions.changeActiveTab('left', idx)}
			tabs={[
				{ text: 'Assets', component: <AssetSelectorContainer actions={actions} /> },
				{ text: 'Watchlist', component: <WatchlistContainer actions={actions} /> },
				{ text: 'Details', component: <AssetDetailsContainer actions={actions} /> },
			]}
		/>
	</div>
);
