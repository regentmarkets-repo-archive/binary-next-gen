import React from 'react';
import Dock from 'react-dock';
import { Tabs } from '../_common';
import PortfolioContainer from '../portfolio/PortfolioContainer';
import ProfitTableContainer from '../profit-table/ProfitTableContainer';
import StatementContainer from '../statement/StatementContainer';
import AssetSelectorContainer from '../asset-selector/AssetSelectorContainer';
import AssetDetailsContainer from '../asset-details/AssetDetailsContainer';
import TradingTimesContainer from '../trading-times/TradingTimesContainer';
import AssetIndexContainer from '../asset-index/AssetIndexContainer';
import VideoPage from '../video/VideoPage';

import TickTradePanel from '../tick-trade/TickTradePanel';
import WatchlistPanel from '../watchlist/WatchlistPanel';

export default () => (
	<div id="workspace">
		<TickTradePanel position={{left: 270, top: 52, width: 300, height: 545 }} />
		<WatchlistPanel position={{left: 575, top: 52, width: 550, height: 200 }} />
		<VideoPage position={{left: 575, top: 452, width: 550, height: 200 }} />

		<Dock position="left" isVisible={true} dimMode="none">
			<Tabs id="left-panel" tabs={[
				{text: 'Assets', component: AssetSelectorContainer},
				{text: 'Details', component: AssetDetailsContainer},
			]} />
		</Dock>
		<Dock position="right" isVisible={true} dimMode="none">
			<Tabs id="right-panel" tabs={[
				{text: 'Trading Times', component: TradingTimesContainer},
				{text: 'Asset Index', component: AssetIndexContainer},
				{text: 'Videos', component: AssetIndexContainer},
				{text: 'News', component: AssetIndexContainer},
			]} />
		</Dock>
		<Dock position="bottom" isVisible={true} dimMode="none">
			<Tabs id="bottom-panel" tabs={[
				{text: 'Open Positions', component: PortfolioContainer},
				{text: 'Transactions', component: StatementContainer},
				{text: 'Profits', component: ProfitTableContainer},
			]} />
        </Dock>
	</div>
);
