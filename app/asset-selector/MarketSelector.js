import React from 'react';
import { SegmentedControl } from '../common';

const MarketSelector = (props) => {
	const marketLinks = props.markets.map(market => ({
		href: '/asset-selector/' + market.toLowerCase(),
		text: market,
	}));
	// const marketFromRoute = offerings.find(x => x.market.toLowerCase() === params.market.toLowerCase());
	// const marketSelected = marketFromRoute || { available: [] };
	// { marketSelected.available.map(x => <AssetIndexTable submarket={x} />) }
	return (
		<SegmentedControl segments={marketLinks} />
	);
};

MarketSelector.propTypes = {
	markets: React.PropTypes.array.isRequired,
};

MarketSelector.defaultProps = {
	markets: [],
};

export default MarketSelector;
