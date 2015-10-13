import React from 'react';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';
import { DragDropContext as dragDropContext} from 'react-dnd';
import PortfolioPanel from '../portfolio/PortfolioPanel';
import TradingTimesPanel from '../trading-times/TradingTimesPanel';
import ProfitTablePanel from '../profit-table/ProfitTablePanel';
import AssetSelectorPanel from '../asset-selector/AssetSelectorPanel';

class WorkspaceCard extends React.Component {
	render() {
		return (
			<div>
				<AssetSelectorPanel position={{left: 10, top: 100, width: 300, height: 300 }} />
				<PortfolioPanel position={{left: 50, top: 300, width: 500, height: 300 }} />
				<TradingTimesPanel position={{left: 650, top: 300, width: 500, height: 300 }} />
				<ProfitTablePanel position={{left: 1250, top: 300, width: 500, height: 300 }} />
			</div>
		);
	}
}

export default dragDropContext(HTML5Backend)(WorkspaceCard);
