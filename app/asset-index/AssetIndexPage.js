import React from 'react';
import SegmentedControl from '../common/SegmentedControl';
import AssetIndexTable from './AssetIndexTable';

export default class AsssetIndexPage extends React.Component {

	static getProps() {
		return {};
	}

	constructor(props) {
		super(props);
	}

	onAssetSelect(idx) {
		console.log('selected', idx);
	}

	render() {

		const segments = ["Forex", "Indices", "Stocks", "Commodities", "Randoms"];

		return (
			<div>
                <SegmentedControl segments={segments} onSelect={this.onAssetSelect} />
				<AssetIndexTable />
			</div>
		);
	}
}
