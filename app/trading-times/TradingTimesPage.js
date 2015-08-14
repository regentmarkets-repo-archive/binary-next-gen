import React from 'react';
import SegmentedControl from '../common/SegmentedControl';
import TradingTimesTable from './TradingTimesTable';
import { marketStructure } from '../asset-index/MarketStructure';

export default class TradingTimesPage extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<SegmentedControl
					segments={marketStructure.map(m => m.name)}
					onSelect={this.onAssetSelect} />
				<TradingTimesTable />
			</div>
		);
	}
}
