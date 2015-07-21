import React from 'react';
import SegmentedControl from '../common/SegmentedControl';
import PricingTable from './PricingTable';
import PricingTableFilter from './PricingTableFilter';

export default class TradingTimesPage extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		return (
			<div>
				<PricingTableFilter />
				<SegmentedControl
					segments={['Mid', 'Bid', 'Ask', 'Spread']}
					onSelect={this.onAssetSelect} />
				<PricingTable />
			</div>
		);
	}
}
