import React from 'react';
import { Resizer, Tabs } from '../_common';
import { DesktopHeader, DesktopSidebar, Footer } from '../navigation';
import PortfolioContainer from '../portfolio/PortfolioContainer';
import ProfitTableContainer from '../profit-table/ProfitTableContainer';
import StatementContainer from '../statement/StatementContainer';
import AssetSelectorContainer from '../asset-selector/AssetSelectorContainer';
import AssetDetailsContainer from '../asset-details/AssetDetailsContainer';
import TradingTimesContainer from '../trading-times/TradingTimesContainer';
import AssetIndexContainer from '../asset-index/AssetIndexContainer';
import NewsContainer from '../news/NewsContainer';
import VideoListContainer from '../video/VideoListContainer';
import TickTradePanel from '../tick-trade/TickTradePanel';
import WatchlistContainer from '../watchlist/WatchlistContainer';
import {defineMessages} from 'react-intl';

export default ({ actions, workspace }) => (
	<div id="screen">
		<DesktopHeader />
		{false && <DesktopSidebar />}
		<div id="panels">
			<div id="left-panel" style={{ width: workspace.get('leftPanelSize') }}>
				<Tabs
					id="left-panel"
					activeIndex={workspace.get('leftActiveTab')}
					onChange={idx => actions.changeActiveTab('left', idx)}
					tabs={[
						{ text: 'Assets', component: <AssetSelectorContainer /> },
						{ text: 'Watchlist', component: <WatchlistContainer /> },
						{ text: 'Details', component: <AssetDetailsContainer /> },
					]} />
			</div>
			<Resizer onResize={e => console.log(e)} />
			<div id="mid-panel">
				<div id="workarea">
					<TickTradePanel position={{ left: 400, top: 52, width: 360, height: 500 }} />
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
							{ text: 'Profits', component: <ProfitTableContainer /> },
						]} />
				</div>
				<Footer />
			</div>
			<Resizer onResize={e => console.log(e)} />
			<div id="right-panel" style={{ width: workspace.get('rightPanelSize') }}>
				<Tabs
					id="right-panel"
					activeIndex={workspace.get('rightActiveTab')}
					onChange={idx => actions.changeActiveTab('right', idx)}
					tabs={[
						{ text: 'Trading Times', component: <TradingTimesContainer /> },
						{ text: 'Asset Index', component: <AssetIndexContainer /> },
						{ text: 'Videos', component: <VideoListContainer /> },
						{ text: 'News', component: <NewsContainer /> },
					]} />
			</div>
		</div>
		<Footer />
	</div>
);

