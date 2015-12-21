import React from 'react';
import { Resizer, Tabs } from '../_common';
import { DesktopHeader, DesktopSidebar, Footer } from '../navigation';
import PortfolioContainer from '../portfolio/PortfolioContainer';
import StatementContainer from '../statement/StatementContainer';
import AssetSelectorContainer from '../asset-selector/AssetSelectorContainer';
import AssetDetailsContainer from '../asset-details/AssetDetailsContainer';
import TradingTimesContainer from '../trading-times/TradingTimesContainer';
import AssetIndexContainer from '../asset-index/AssetIndexContainer';
import NewsContainer from '../news/NewsContainer';
import VideoListContainer from '../video/VideoListContainer';
import TickTradeContainer from '../tick-trade/TickTradeContainer';
import WatchlistContainer from '../watchlist/WatchlistContainer';

export default ({ actions, workspace }) => (
	<div id="screen">
		<DesktopHeader actions={actions} />
		{false && <DesktopSidebar />}
		<div id="panels">
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
			<Resizer onResize={e => actions.updateWorkspaceField('leftPanelSize', e.x - 1)} />
			<div id="mid-panel">
				<div id="workarea">
					<TickTradeContainer actions={actions} />
				</div>
				<Resizer onResize={e => console.log(e)} />
				<div id="bottom-panel" style={{ height: workspace.get('bottomPanelSize') }}>
					<Tabs
						id="bottom-panel"
						activeIndex={workspace.get('bottomActiveTab')}
						onChange={idx => actions.changeActiveTab('bottom', idx)}
						tabs={[
							{ text: 'Open Positions', component: <PortfolioContainer /> },
							{ text: 'Transactions', component: <StatementContainer /> },
						]}
					/>
				</div>
				<Footer />
			</div>
			<Resizer onResize={e => actions.updateWorkspaceField('rightPanelSize', window.innerWidth - e.x - 1)} />
			<div id="right-panel" style={{ width: workspace.get('rightPanelSize') }}>
				<Tabs
					id="right-panel"
					activeIndex={workspace.get('rightActiveTab')}
					onChange={idx => actions.changeActiveTab('right', idx)}
					tabs={[
						{ text: 'Trading Times', component: <TradingTimesContainer actions={actions} /> },
						{ text: 'Asset Index', component: <AssetIndexContainer actions={actions}/> },
						{ text: 'Videos', component: <VideoListContainer /> },
						{ text: 'News', component: <NewsContainer /> },
					]}
				/>
			</div>
		</div>
		<Footer />
	</div>
);
