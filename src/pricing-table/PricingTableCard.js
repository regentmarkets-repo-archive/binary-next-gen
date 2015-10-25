import React from 'react';
import SegmentedControl from '../_common/SegmentedControl';
import PricingTable from './PricingTable';
import PricingTableFilter from './PricingTableFilter';

const PricingTableCard = ({onAssetSelect}) => (
	<div>
		<PricingTableFilter />
		<SegmentedControl
			segments={['Mid', 'Bid', 'Ask', 'Spread']}
			onSelect={onAssetSelect} />
		<PricingTable />
	</div>
);

export default PricingTableCard;
