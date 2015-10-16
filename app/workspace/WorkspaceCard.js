import React from 'react';
import AssetSelectorPanel from '../asset-selector/AssetSelectorPanel';
import AssetDetailsPanel from '../asset-details/AssetDetailsPanel';
import PortfolioPanel from '../portfolio/PortfolioPanel';
import TradingTimesPanel from '../trading-times/TradingTimesPanel';
import AssetIndexPanel from '../asset-index/AssetIndexPanel';
import WatchlistPanel from '../watchlist/WatchlistPanel';
import ProfitTablePanel from '../profit-table/ProfitTablePanel';
import BalancesPanel from '../balances/BalancesPanel';
import StatementPanel from '../statement/StatementPanel';

export default (props) => (
	<div>
		<BalancesPanel position={{left: 1, top: 52, width: 320, height: 110 }} />
		<AssetSelectorPanel position={{left: 1, top: 163, width: 320, height: 450 }} />
		<AssetDetailsPanel position={{left: 1, top: 615, width: 320, height: 370 }} />

		<WatchlistPanel position={{left: 325, top: 52, width: 550, height: 200 }} />
		<AssetIndexPanel position={{left: 325, top: 255, width: 550, height: 360 }} />
		<TradingTimesPanel position={{left: 325, top: 620, width: 550, height: 360 }} />

		<PortfolioPanel position={{left: 880, top: 52, width: 800, height: 300 }} />
		<StatementPanel position={{left: 880, top: 355, width: 800, height: 300 }} />
		<ProfitTablePanel position={{left: 880, top: 660, width: 800, height: 300 }} />
	</div>
);
