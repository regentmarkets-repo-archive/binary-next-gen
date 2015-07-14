import React from 'react';
import SegmentedControl from '../common/SegmentedControl';
import { marketStructure } from '../asset-index/MarketStructure';

export default class TradingTimesPage extends React.Component {

	constructor(props) {
		super(props);
	}

	static getProps() {
		return {};
	}

	render() {

		return (
			<SegmentedControl
				segments={marketStructure.map(m => m.name)}
				onSelect={this.onAssetSelect} />
		);
	}
}
