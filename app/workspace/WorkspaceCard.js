import React from 'react';
import AssetSelectorPanel from '../asset-selector/AssetSelectorPanel';
import AssetDetailsPanel from '../asset-details/AssetDetailsPanel';
import PortfolioPanel from '../portfolio/PortfolioPanel';
import TradingTimesPanel from '../trading-times/TradingTimesPanel';
import TicksPanel from '../ticks/TicksPanel';
import ProfitTablePanel from '../profit-table/ProfitTablePanel';
import BalancesPanel from '../balances/BalancesPanel';
import StatementPanel from '../statement/StatementPanel';
import TickTradePanel from '../tick-trade/TickTradePanel';

export default (props) => (
	<div>
		<BalancesPanel position={{left: 1, top: 52, width: 320, height: 110 }} />
		<AssetSelectorPanel position={{left: 1, top: 163, width: 320, height: 450 }} />
		<AssetDetailsPanel position={{left: 1, top: 605, width: 320, height: 300 }} />

		<TicksPanel position={{left: 325, top: 52, width: 500, height: 200 }} />
		<TickTradePanel position={{left: 325, top: 300, width: 500, height: 300 }} />
		<TradingTimesPanel position={{left: 325, top: 700, width: 500, height: 300 }} />

		<PortfolioPanel position={{left: 1200, top: 52, width: 600, height: 300 }} />
		<StatementPanel position={{left: 1200, top: 355, width: 600, height: 300 }} />
		<ProfitTablePanel position={{left: 1200, top: 700, width: 600, height: 300 }} />
	</div>
);
