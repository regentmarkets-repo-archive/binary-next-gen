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

const updateSizeWithBoundary = (size, update, min, max) => {
	if (size < min) {
		update(10);
		return;
	}

	if (size > max) {
		return;
	}

	update(size);
};

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
			<Resizer
				className="resizer-vertical"
				onResize={e => {
					const update = actions.updateWorkspaceField.bind(null, 'leftPanelSize');
					const size = e.x - 4;
					updateSizeWithBoundary(size, update, 100, 750);
					}
				}
			/>
			<div id="mid-panel">
				<div id="workarea">
					<TickTradeContainer actions={actions} />
				</div>
				<Resizer
					className="resizer-horizontal"
					onResize={e => {
						const update = actions.updateWorkspaceField.bind(null, 'bottomPanelSize');
						const size = window.innerHeight - e.y - 4;
						updateSizeWithBoundary(size, update, 100, 300);
						}
					}
				/>
				<div id="bottom-panel" style={{ height: workspace.get('bottomPanelSize') }}>
					<Tabs
						id="bottom-panel"
						activeIndex={workspace.get('bottomActiveTab')}
						onChange={idx => actions.changeActiveTab('bottom', idx)}
						tabs={[
							{ text: 'Open Positions', component: <PortfolioContainer actions={actions} /> },
							{ text: 'Transactions', component: <StatementContainer actions={actions} /> },
						]}
					/>
				</div>
				<Footer />
			</div>
			<Resizer
				className="resizer-vertical"
				onResize={e => {
					const update = actions.updateWorkspaceField.bind(null, 'rightPanelSize');
					const size = window.innerWidth - e.x - 4;
					updateSizeWithBoundary(size, update, 100, 700);
				}}
			/>
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
		</div>
		<Footer />
	</div>
);
