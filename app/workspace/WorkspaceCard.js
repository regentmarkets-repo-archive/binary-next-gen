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
import TickTradePanel from '../tick-trade/TickTradePanel';

export default (props) => (
	<div>
		<BalancesPanel position={{left: 1, top: 52, width: 320, height: 110 }} />
		<AssetSelectorPanel position={{left: 1, top: 163, width: 320, height: 450 }} />
		<AssetDetailsPanel position={{left: 1, top: 615, width: 320, height: 350 }} />

		<WatchlistPanel position={{left: 325, top: 52, width: 500, height: 200 }} />
		<TickTradePanel position={{left: 325, top: 300, width: 500, height: 300 }} />
		<AssetIndexPanel position={{left: 325, top: 650, width: 500, height: 300 }} />
		<TradingTimesPanel position={{left: 325, top: 650, width: 500, height: 300 }} />

		<PortfolioPanel position={{left: 850, top: 52, width: 700, height: 300 }} />
		<StatementPanel position={{left: 850, top: 355, width: 700, height: 300 }} />
		<ProfitTablePanel position={{left: 850, top: 650, width: 700, height: 300 }} />
	</div>
);
