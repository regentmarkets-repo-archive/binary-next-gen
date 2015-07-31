import React from 'react';
import SegmentedControl from '../common/SegmentedControl';
import AssetIndexTable from './AssetIndexTable';
import { marketStructure } from './MarketStructure';

export default class AsssetIndexPage extends React.Component {

	constructor(props) {
		super(props);
	}

	onAssetSelect(idx) {
	}

	render() {

		return (
			<div>
                <SegmentedControl
					segments={marketStructure.map(m => m.name)}
					onSelect={this.onAssetSelect} />
				<AssetIndexTable />
			</div>
		);
	}
}
