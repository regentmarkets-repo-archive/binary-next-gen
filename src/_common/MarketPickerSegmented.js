import React, { PropTypes, Component } from 'react';
import SegmentedControl from '../_common/SegmentedControl';

const MarketPicker = ({ markets, selected, prefixRoute }) => {
	const marketLinks = markets.map(market => ({
		href: prefixRoute + market.toLowerCase(),
		text: market,
	}));
	const marketFromRouteIdx = markets.indexOf(m => m.toLowerCase() === selected);

	return (
		<SegmentedControl segments={marketLinks} activeIndex={marketFromRouteIdx} />
	);
};

MarketPicker.propTypes = {
	markets: PropTypes.array.isRequired,
	selected: PropTypes.string,
};

MarketPicker.defaultProps = {
	markets: [],
	selected: 'favorites',
};

export default MarketPicker;
