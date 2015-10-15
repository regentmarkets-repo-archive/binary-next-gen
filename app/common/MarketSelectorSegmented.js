import React from 'react';
import { SegmentedControl } from '../common';

const MarketSelector = ({markets, selected, prefixRoute}) => {
	const marketLinks = markets.map(market => ({
		href: prefixRoute + market.toLowerCase(),
		text: market,
	}));
	const marketFromRouteIdx = markets.indexOf(m => m.toLowerCase() === selected);

	return (
		<SegmentedControl segments={marketLinks} activeIndex={marketFromRouteIdx} />
	);
};

MarketSelector.propTypes = {
	markets: React.PropTypes.array.isRequired,
	selected: React.PropTypes.string,
};

MarketSelector.defaultProps = {
	markets: [],
	selected: 'favorites',
};

export default MarketSelector;
