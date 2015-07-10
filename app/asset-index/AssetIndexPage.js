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

		const marketStructure = [{
			name: 'Forex',
			submarkets: [
				'Major Pairs',
				'Minor Pairs',
				'Smart FX'
			]
		}, {
			name: 'Indices',
			submarkets: [
				'Asia/Oceania',
				'Europe/Africa',
				'Americas',
				'Smart Indices'
			]
		}, {
			name: 'Stocks',
			submarkets: [
				'French Stocks',
				'Belgian Stocks',
				'Dutch Stocks',
				'Germany Stocks',
				'United Kingdom Stocks'
			]
		}, {
			name: 'Commodities',
			submarkets: [
				'Metals',
				'Energy'
			]
		}, {
			name: 'Randoms',
			submarkets: [
				'Indices',
				'Quotidians',
				'Nocturnes'
			]
		}];

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
