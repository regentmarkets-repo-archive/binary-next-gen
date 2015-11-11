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

import TickTradePanel from '../tick-trade/TickTradePanel';
import WatchlistPanel from '../watchlist/WatchlistPanel';

export default () => (
	<div id="workspace">
		<TickTradePanel position={{left: 70, top: 52, width: 300, height: 545 }} />
		<WatchlistPanel position={{left: 375, top: 52, width: 550, height: 200 }} />

		<Dock position="left" isVisible={true} dimMode="none">
			<Tabs tabs={[
					{text: 'Assets', control: AssetSelectorContainer},
					{text: 'Details', control: AssetDetailsContainer},
				]} />
		</Dock>
		<Dock position="right" isVisible={true} dimMode="none">
			<Tabs tabs={[
					{text: 'Trading Times', control: TradingTimesContainer},
					{text: 'Asset Index', control: AssetIndexContainer},
					{text: 'Videos', control: AssetIndexContainer},
					{text: 'Assets', control: AssetIndexContainer},
				]} />
		</Dock>
		<Dock position="bottom" isVisible={true} dimMode="none">
			<Tabs tabs={[
					{text: 'Open Positions', control: PortfolioContainer},
					{text: 'Transactions', control: StatementContainer},
					{text: 'Profits', control: ProfitTableContainer},
				]} />
        </Dock>
	</div>
);
