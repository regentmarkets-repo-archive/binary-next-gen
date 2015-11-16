import React from 'react';
import { Tabs } from '../_common';
import { DesktopHeader, DesktopSidebar } from '../navigation';
import PortfolioContainer from '../portfolio/PortfolioContainer';
import ProfitTableContainer from '../profit-table/ProfitTableContainer';
import StatementContainer from '../statement/StatementContainer';
import AssetSelectorContainer from '../asset-selector/AssetSelectorContainer';
import AssetDetailsContainer from '../asset-details/AssetDetailsContainer';
import TradingTimesContainer from '../trading-times/TradingTimesContainer';
import AssetIndexContainer from '../asset-index/AssetIndexContainer';
import NewsContainer from '../news/NewsContainer';
import VideoPage from '../video/VideoPage';


import TickTradePanel from '../tick-trade/TickTradePanel';
import WatchlistPanel from '../watchlist/WatchlistPanel';

const Footer = () => <div />; // nothing yet

export default ({actions, workspace}) => (
	<div id="screen">
		<DesktopHeader />
		{false && <DesktopSidebar />}
		<div id="panels">
			<div id="left-panel">
				<Tabs
					id="left-panel"
					activeIndex={workspace.get('leftActiveTab')}
					onChange={idx => actions.updateActiveTab('left', idx)}
					tabs={[
						{text: 'Assets', component: AssetSelectorContainer},
						{text: 'Details', component: AssetDetailsContainer},
					]} />
			</div>
			<div id="mid-panel">
				<div id="workarea">
					<TickTradePanel position={{left: 400, top: 52, width: 400, height: 545 }} />
					<WatchlistPanel position={{left: 575, top: 352, width: 550, height: 200 }} />
					<VideoPage position={{left: 575, top: 452, width: 550, height: 200 }} />
				</div>
				<div id="bottom-panel">
					<Tabs
						id="bottom-panel"
						activeIndex={workspace.get('bottomActiveTab')}
						onChange={idx => actions.updateActiveTab('bottom', idx)}
						tabs={[
							{text: 'Open Positions', component: PortfolioContainer},
							{text: 'Transactions', component: StatementContainer},
							{text: 'Profits', component: ProfitTableContainer},
						]} />
				</div>
			</div>
			<div id="right-panel">
				<Tabs
					id="right-panel"
					activeIndex={workspace.get('rightActiveTab')}
					onChange={idx => actions.updateActiveTab('right', idx)}
					tabs={[
						{text: 'Trading Times', component: TradingTimesContainer},
						{text: 'Asset Index', component: AssetIndexContainer},
						{text: 'Videos', component: VideoPage},
						{text: 'News', component: NewsContainer},
					]} />
			</div>
		</div>
		<Footer />
	</div>
);
